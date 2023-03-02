import { cloneDeep } from 'lodash'
import { URLBACK } from '../../env'
import { updateUser } from '../../reducers/userReducer'
import { updateSetting } from '../../reducers/settingReducer'
import { updateMember } from '../../reducers/memberReducer'
import { updateOrganization } from '../../reducers/organizationReducer'
import { updateSequence } from '../../reducers/sequenceReducer'
import { updateQuestion } from '../../reducers/questionReducer'
import { updateCurrentSequence } from '../../reducers/currentSequenceReducer'
import { createAxios, userNeedsToAnswerSurvey } from '../utils'
import {
  onboardingIsFinished,
  setToDefaultOnboarding,
} from '../../reducers/onboardingReducer'
import { findCurrentStepIfAlreadySomeAnswers } from './authSlack'

export default async function getOrg({ jwt, setError, dispatch, navigate, setLoading }) {
  const axios = createAxios(jwt)
  try {
    let onboardingUrl = `${URLBACK}services/onboardUser`

    const { data, status } = await axios.get(onboardingUrl)
    const { user, jwt, organization, setting, members, sequences, allQuestions } = data
    if (status !== 200) {
      console.log('STATUS', status, data)
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
      setLoading(false)
    }
    window.$crisp.push(['set', 'user:email', user.email])
    window.analytics.identify(user.email, {
      name: user.name,
      email: user.email,
    })

    // const onboardedMembers = members.filter((m) => m?.isActive)
    // if (!(onboardedMembers?.length > 0)) {
    //   navigate('/team/manage')
    // } else {
    //   navigate('/answers/results')
    // }
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
