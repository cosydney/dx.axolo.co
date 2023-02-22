import React, { useState } from 'react'
import Axios from 'axios'
import { useEffectOnce, useLocation } from 'react-use'
import { useDispatch } from 'react-redux'
import { URLBACK } from '../../env'
import { updateUser } from '../../reducers/userReducer'
import { LogOutButton } from '../logoutButton'
import HomeFooter from '../homeFooter'
import { useNavigate } from 'react-router-dom'
import { updateSetting } from '../../reducers/settingReducer'
import { updateMember } from '../../reducers/memberReducer'
import { updateOrganization } from '../../reducers/organizationReducer'
import { updateSequence } from '../../reducers/sequenceReducer'
import { updateQuestion } from '../../reducers/questionReducer'
import { updateCurrentSequence } from '../../reducers/currentSequenceReducer'
import { userNeedsToAnswerSurvey } from '../utils'
import { cloneDeep } from 'lodash'

function findCurrentStepIfAlreadySomeAnswers({ allQuestions, user, sequences }) {
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

export default function SlackAuth() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const loggingUser = async () => {
    try {
      const { data, status } = await Axios.get(
        `${URLBACK}services/auth/slack/callback${location.search}`,
      )
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
      // window.$crisp.push(['set', 'user:email', user.email])
      // window.analytics.identify(user.email, {
      //   name: user.name,
      //   email: user.email,
      // })

      navigate('/answers/results')
    } catch (e) {
      console.log('Error with Slack Auth: ', e?.response?.data?.message, e)
      if (
        e?.response?.data?.message?.[0]?.messages[0]?.id ===
        'Auth.form.error.email.taken.username'
      ) {
        setError('Same email different workspace.')
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

  const LoadingMessage = () => {
    return (
      <div className="">
        <h2 className="text-ourBlack mt-6 text-center text-3xl font-bold">Loading</h2>
        <div className="mt-24 flex justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 inline h-8 w-8 animate-spin fill-primary text-gray-200 "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" h-screen bg-white">
      <div className="flex h-[88vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <img className="mx-auto h-12 w-auto" src="/logo/22.png" alt="Logo Axolo" />
          {error ? <ErrorMessage /> : <LoadingMessage />}
        </div>
      </div>
      <HomeFooter />
    </div>
  )
}
