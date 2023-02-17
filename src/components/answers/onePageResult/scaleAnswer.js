import { findIndex, findKey } from 'lodash'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Member } from '../../../reducers/memberReducer'
import ScaleBarChart from './scaleBarChart'

const chartContainerCss = 'h-56 my-10'

export default function ScaleAnswer({ answers }) {
  const members = useSelector(Member.selectors.getMember)

  const data = []

  for (const answer of answers) {
    const index = findIndex(data, { intAnswer: answer.intAnswer })
    if (index < 0) {
      data.push({
        intAnswer: answer.intAnswer,
        count: 1,
        originalAnswers: [answer],
      })
    } else {
      data[index] = {
        ...data[index],
        count: data[index]?.count + 1,
        originalAnswers: [...data[index]?.originalAnswers, answer],
      }
    }
  }

  // sort data array by the property intAnswer
  data.sort((a, b) => a.intAnswer - b.intAnswer)

  // todo could be improved and doing it in the step before if we do not find the number in intAnswers
  // if we do not find an answer, we need to artificially add it in our data array to show that it's empty
  for (let i = 1; i <= 5; i += 1) {
    if (!data.find((d) => d.intAnswer === i)) {
      data.splice(i, 0, {
        intAnswer: i,
        count: 0,
        originalAnswers: [],
      })
    }
  }

  return (
    <div className="">
      <div className="grid  grid-cols-2 gap-8">
        <div className={chartContainerCss}>
          <ScaleBarChart data={data} />
        </div>
        <div className={chartContainerCss} />
      </div>
    </div>
  )
}
