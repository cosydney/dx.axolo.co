import { findIndex } from 'lodash'
import ScaleBarChart from './scaleBarChart'

const chartContainerCss = 'h-56 my-10'

export default function ScaleAnswer({ answers }) {
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
  // todo could be improved and doing it in the step before if we do not find the number in intAnswers
  // if we do not find an answer, we need to artificially add it in our data array to show that it's empty
  for (let i = 1; i <= 5; i += 1) {
    if (!data.find((d) => d?.intAnswer === i)) {
      data.splice(i, 0, {
        intAnswer: i,
        count: 0,
        originalAnswers: [],
      })
    }
  }

  // sort data array by the property intAnswer
  data.sort((a, b) => a.intAnswer - b.intAnswer)

  return (
    <div className="flex justify-center">
      <div className=" mb-10 max-h-[300px] w-[400px]">
        {/* when we also have the historic view  className="grid  grid-cols-2 gap-8" */}
        <div className={chartContainerCss}>
          <ScaleBarChart data={data} />
        </div>
        <div className={chartContainerCss} />
      </div>
    </div>
  )
}
