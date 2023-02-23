import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { capitalize } from 'lodash'
import { Sequence } from '../../../reducers/sequenceReducer'
import MainAppDiv from '../../Layout/mainAppDiv'
import { AppHeader, AppSecondaryHeader, QuestionHeading } from '../../utils'
import ScaleAnswer from './scaleAnswer'
import TextAnswer from './textAnswer'
import { useEffectOnce } from 'react-use'
import { updateOnboarding } from '../../../reducers/onboardingReducer'

export default function OnePageResult() {
  const sequences = useSelector(Sequence.selectors.getSequence)
  const location = useLocation()
  const sequencedId = location?.pathname?.split('/')?.[3]
  const thisSequence = sequences?.list?.find((seq) => seq.id?.toString() === sequencedId)
  const dispatch = useDispatch()

  useEffectOnce(() => {
    dispatch(updateOnboarding({ step3: true }))
  })

  // the following code creates an object such as this: {topic : [{question: [array of answers]}}}
  // allAnswersPerTopic = {
  //   "code review acceptance rate": [
  //     {"How often do you pair program?": [array of answers]},
  //     ...,
  //    ];
  //  }

  const allAnswersPerTopic = {}
  for (const answer of thisSequence.answers) {
    const topic = answer?.question?.topic?.title
    if (!allAnswersPerTopic[topic]) {
      allAnswersPerTopic[topic] = {}
    }
    if (!allAnswersPerTopic[topic][answer?.question?.text])
      allAnswersPerTopic[topic][answer?.question?.text] = [answer]
    else allAnswersPerTopic[topic][answer?.question?.text].push(answer)
  }

  return (
    <MainAppDiv>
      <AppHeader>{capitalize(thisSequence.theme.name)}</AppHeader>
      {Object.keys(allAnswersPerTopic).map((topic, i) => {
        return (
          <div className="" key={i}>
            <AppSecondaryHeader>{capitalize(topic)} </AppSecondaryHeader>
            {Object.keys(allAnswersPerTopic[topic]).map((question, i) => {
              return (
                <div className="" key={i}>
                  <QuestionHeading>{question}</QuestionHeading>
                  {allAnswersPerTopic[topic][question][0]?.question?.type === 'scale' ? (
                    <ScaleAnswer answers={allAnswersPerTopic[topic][question]} />
                  ) : (
                    <TextAnswer answers={allAnswersPerTopic[topic][question]} />
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </MainAppDiv>
  )
}
