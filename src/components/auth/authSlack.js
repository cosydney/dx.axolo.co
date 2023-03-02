import React, { useState } from 'react'
import Axios from 'axios'
import { useEffectOnce, useLocation } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { URLBACK } from '../../env'
import { updateUser } from '../../reducers/userReducer'
import { LogOutButton } from '../logoutButton'
import { useNavigate } from 'react-router-dom'
import { Member } from '../../reducers/memberReducer'
import { cloneDeep } from 'lodash'
import LoadingMessage from '../loading'
import PublicLayout from '../../pages/PublicLayout'
import getOrg from './onboardUser'

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
  const members = useSelector(Member.selectors.getMember)

  const loggingUser = async () => {
    try {
      let authUrl = `${URLBACK}services/auth/slack/callback${location.search}`
      if (type === 'dummy') {
        authUrl = `${URLBACK}services/auth/testAccount/callback`
      }
      const { data, status } = await Axios.get(authUrl)
      const { user, jwt } = data
      if (status !== 200) {
        console.log('STATUS NOT 200', status, data)
        setError(`Status: ${status}. Message: ${data.message}.`)
        return
      }

      dispatch(updateUser({ ...user, jwt }))
      await getOrg({
        jwt,
        setError,
        dispatch,
      })
      const onboardedMembers = members?.list?.filter((m) => m?.isActive)
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

  return <PublicLayout>{error ? <ErrorMessage /> : <LoadingMessage />}</PublicLayout>
}
