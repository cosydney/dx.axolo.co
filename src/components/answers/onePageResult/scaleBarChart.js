import { useSelector } from 'react-redux'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts'
import { Member } from '../../../reducers/memberReducer'

export default function ScaleBarChart({ data }) {
  const members = useSelector(Member.selectors.getMember)

  const renderTooltip = (props) => {
    const intAnswer = props.label
    const answeredByIds = data
      ?.find((d) => d.intAnswer === intAnswer)
      ?.originalAnswers.map((a) => a.answeredBy)
    const answeredBy = answeredByIds?.map(({ id }) =>
      members?.list?.find((m) => m.id === id),
    )
    if (!(answeredBy?.length > 0)) return null

    const introSentence = answeredBy?.length > 1 ? 'These developers' : 'This developer'
    return (
      <div className="rounded-sm bg-white px-4 py-2 shadow-sm">
        <p className="mb-2">
          {introSentence} answered {intAnswer}:
        </p>
        {answeredBy?.map((member) => (
          <div className="flex items-center  ">
            <div className="h-10 w-10 flex-shrink-0 ">
              <img className="h-10 w-10 rounded-full" src={member.avatarUrl} alt="" />
            </div>
            <div className="ml-4 ">
              <div className="font-medium text-gray-900">{member.username}</div>
              <div className="text-gray-500">{member.email}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          // top: 5,
          // right: 30,
          left: 30,
          bottom: 20,
        }}
      >
        <XAxis dataKey="intAnswer">
          <Label value="Evaluation" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis domain={[0, 'dataMax']}>
          <Label value="# devs" offset={-10} position="insideLeft" />
        </YAxis>
        <Tooltip content={renderTooltip} />
        {/* <Legend /> */}
        <Bar dataKey="count" fill="#0049ff" />
      </BarChart>
    </ResponsiveContainer>
  )
}
