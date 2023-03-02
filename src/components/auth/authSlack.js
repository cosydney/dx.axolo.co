import React, { useState } from 'react'
import Axios from 'axios'
import { useEffectOnce, useLocation } from 'react-use'
import { useDispatch } from 'react-redux'
import { URLBACK } from '../../env'
import { updateUser } from '../../reducers/userReducer'
import { LogOutButton } from '../logoutButton'
import { useNavigate } from 'react-router-dom'
import { updateSetting } from '../../reducers/settingReducer'
import { updateMember } from '../../reducers/memberReducer'
import { updateOrganization } from '../../reducers/organizationReducer'
import { updateSequence } from '../../reducers/sequenceReducer'
import { updateQuestion } from '../../reducers/questionReducer'
import { updateCurrentSequence } from '../../reducers/currentSequenceReducer'
import { userNeedsToAnswerSurvey } from '../utils'
import { cloneDeep } from 'lodash'
import {
  onboardingIsFinished,
  setToDefaultOnboarding,
} from '../../reducers/onboardingReducer'
import LoadingMessage from '../loading'
import PublickLayout from '../../pages/PublicLayout'

export function findCurrentStepIfAlreadySomeAnswers({ allQuestions, user, sequences }) {
  const questionsOfCurrentSequence = cloneDeep(
    allQuestions.filter(
      (q) => q.topic?.theme?.id === user?.surveyRequests?.[0]?.sequence?.theme?.id,
    ),
  )
  for (let i = 0; i < questionsOfCurrentSequence.length; i++) {
    questionsOfCurrentSequence[i].sequence = user?.surveyRequests?.[0]?.sequence
  }
  const previousAnswersOfThisUsers = sequences?.[0]?.answers?.filter(
    (a) => a.answeredBy.id === user.id,
  )
  return previousAnswersOfThisUsers?.length || 0
}

export default function SlackAuth({ type = 'slack' }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const loggingUser = async () => {
    try {
      let authUrl = `${URLBACK}services/auth/slack/callback${location.search}`
      if (type === 'dummy') {
        authUrl = `${URLBACK}services/auth/testAccount/callback`
      }
      const { data, status } = await Axios.get(authUrl)
      const { user, jwt, organization, setting, members, sequences, allQuestions } = data
      if (status !== 200) {
        console.log('STATUS NOT 200', status, data)
        setError(`Status: ${status}. Message: ${data.message}.`)
        return
      }

      dispatch(updateUser({ ...user, jwt }))
      dispatch(updateSetting({ ...setting }))
      dispatch(updateMember({ list: members }))
      dispatch(updateOrganization({ ...organization }))
      dispatch(updateSequence({ list: sequences }))
      dispatch(updateQuestion({ list: allQuestions }))

      if (setting.finishedOnboarding) {
        dispatch(onboardingIsFinished())
      } else {
        let step1 = members.filter((member) => member.isActive)?.length >= 2
        dispatch(setToDefaultOnboarding(step1))
      }

      const needsToAnswer = userNeedsToAnswerSurvey(user)
      if (needsToAnswer) {
        const questionsOfCurrentSequence = cloneDeep(
          allQuestions.filter(
            (q) => q.topic?.theme?.id === user?.surveyRequests?.[0]?.sequence?.theme?.id,
          ),
        )
        const step = findCurrentStepIfAlreadySomeAnswers({
          allQuestions,
          user,
          sequences,
        })
        dispatch(
          updateCurrentSequence({
            questions: questionsOfCurrentSequence,
            step,
            id: user?.surveyRequests?.[0]?.sequence?.id,
          }),
        )
      }
      window.$crisp.push(['set', 'user:email', user.email])
      window.analytics.identify(user.email, {
        name: user.name,
        email: user.email,
      })

      const onboardedMembers = members.filter((m) => m?.isActive)
      if (!(onboardedMembers?.length > 0)) {
        navigate('/team/manage')
      } else {
        navigate('/answers/results')
      }
    } catch (e) {
      console.log('Error with Slack Auth: ', e?.response?.data?.message, e)
      console.log(e)
      if (
        e?.response?.data?.message?.[0]?.messages[0]?.id ===
        'Auth.form.error.email.taken.username'
      ) {
        setError('Same email different workspace.')
        return
      }
      console.log('e?.response?.data?.error?', e?.response?.data?.error)
      if (e?.response?.data?.error?.includes('No token found for this team')) {
        setError('No team found for your Slack account, try Add to Slack instead.')
        return
      }

      if (typeof e?.response?.data?.message === 'string') {
        setError(e?.response?.data?.message)
      } else {
        setError('Something wrong just happened')
        return
      }
    }
  }

  useEffectOnce(() => {
    loggingUser().then()
  })

  const ErrorMessage = () => {
    return (
      <div className="flex flex-col items-center ">
        <h2 className="text-ourBlack mt-6 text-center text-3xl font-bold">
          There has been an error logging you in:
        </h2>
        <p className="mt-2 text-center text-sm text-ourGrey">Error: {error}</p>
        <p className="mt-2 mb-2 text-center text-sm text-ourGrey">
          Contact support or try again.
        </p>
        <LogOutButton />
      </div>
    )
  }

  return <PublickLayout>{error ? <ErrorMessage /> : <LoadingMessage />}</PublickLayout>
}
