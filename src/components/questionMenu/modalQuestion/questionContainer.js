// https://github.com/KaterinaLupacheva/react-progress-bar
import ProgressBar from '@ramonak/react-progress-bar'
import { Dialog } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CurrentSequence,
  updateCurrentSequence,
} from '../../../reducers/currentSequenceReducer'
import { capitalize, cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { RatingComponent } from 'react-rating-emoji'
import 'react-rating-emoji/dist/index.css'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import { useAxiosWithHeader } from '../../utils'
import { URLBACK } from '../../../env'
import { Organization } from '../../../reducers/organizationReducer'
import messageInteraction from '../../messageInteraction'
import { updateUser, User } from '../../../reducers/userReducer'

export default function QuestionContainer() {
  const organization = useSelector(Organization.selectors.getOrganization)
  const user = useSelector(User.selectors.selectUser)
  const currentSequence = useSelector(CurrentSequence.selectors.getCurrentSequence)
  const [textValue, setTextValue] = useState('')
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()
  const axios = useAxiosWithHeader()

  const handleRating = (newRating) => {
    setRating(newRating)
  }

  const { step, questions } = currentSequence
  const totalSteps = currentSequence?.questions?.length
  let completion = (step / questions.length) * 100
  if (completion === 0) {
    completion = 10
  }

  const [completionBar, setCompletionbar] = useState(completion)

  useEffect(() => {
    completion = (step / questions.length) * 100
    if (completion === 0) {
      completion = 10
    }
    // if the sequence is completed
    if (step === totalSteps) {
      const updatedSurveyRequests = cloneDeep(user.surveyRequests)
      if (updatedSurveyRequests && updatedSurveyRequests.length > 0) {
        updatedSurveyRequests[0].answered = true
        dispatch(updateUser({ ...user, surveyRequests: updatedSurveyRequests }))
        messageInteraction({
          type: 'success',
          content: 'You have completed the survey! 🥳 Thank you.',
        })
      }
    }
    setCompletionbar(completion)
  }, [step])

  // const questionType = currentSequence?.questions?.[1]?.type
  const questionType = currentSequence?.questions?.[step]?.type

  const ScaleQuestion = () => {
    return (
      <div className="flex justify-center">
        <RatingComponent rating={rating} onClick={handleRating} />
      </div>
    )
  }

  const TextInputQuestion = ({ step }) => {
    return (
      <div className="mt-4">
        <textarea
          rows={4}
          name="text-input-question"
          /* todo this could be improved: ref & onFocus. I lost focus at each render,so I needed to do this
           ** it seems to be slowing the input field.
           */
          ref={(ref) => ref && ref.focus()}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length,
            )
          }
          key={'text-input-question' + step}
          id="text-input-question"
          className="block max-h-28 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
        />
      </div>
    )
  }
  async function clickOnNextQuestion() {
    if (
      (questionType === 'scale' && rating === 0) ||
      (questionType === 'text' && textValue === '')
    ) {
      messageInteraction({
        type: 'warning',
        content: 'Please answer the question before continuing.',
      })
      return
    }
    try {
      await axios.post(
        `${URLBACK}answers/user-answers-from-app?orgId=${organization.id}`,
        {
          questionId: currentSequence?.questions?.[step]?.id,
          answer: questionType === 'scale' ? rating : textValue,
          type: questionType,
          step,
          totalSteps,
          surveyRequestId: user?.surveyRequests?.[0]?.id,
          sequenceId: currentSequence.id,
          topic: currentSequence?.questions?.[step]?.topic?.id,
        },
      )
      setTextValue('')
      setRating(0)
      const currentQuestions = cloneDeep(currentSequence.questions)
      currentQuestions[step].answered = true
      if (questionType === 'scale') {
        currentQuestions[step].intAnswer = rating
      } else if (questionType === 'text') {
        currentQuestions[step].textAnswer = textValue
      }
      dispatch(updateCurrentSequence({ questions: currentQuestions, step: step + 1 }))
    } catch (e) {
      console.log('errororororororo', e)
    }
  }

  return (
    <div className="">
      <div className="">
        <div>
          <ProgressBar
            bgColor="#0049ff"
            height="15px"
            completed={completionBar}
            customLabel={' '}
          />
          <div className="mt-3 text-left sm:mt-5">
            <Dialog.Title
              as="h3"
              className="mt-6 text-xl font-semibold leading-6 text-gray-900"
            >
              {capitalize(currentSequence?.questions?.[step]?.topic?.title) ||
                'Loading...'}
            </Dialog.Title>
            <div className="mt-6">
              <p className=" text-gray-500">
                {currentSequence?.questions?.[step]?.text || 'Loading...'}
              </p>
            </div>
          </div>
          <div className="mt-6 h-40 w-full ">
            {questionType === 'scale' ? (
              <ScaleQuestion />
            ) : (
              <TextInputQuestion step={step} />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <div className="mt-5  sm:mt-6">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 focus:ring-0"
            onClick={() => clickOnNextQuestion()}
          >
            Next <ArrowSmallRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
