import { useSelector } from 'react-redux'
import { groupBy } from 'lodash'
import { Sequence } from '../../../reducers/sequenceReducer'
import ThemeBadge from '../../answers/results/themeBadge'
import {
  AppSecondaryHeader,
  classNames,
  sortArrayAfterString,
  themeOrder,
} from '../../utils'
import { Question } from '../../../reducers/questionReducer'
import moment from 'moment'
import { Setting } from '../../../reducers/settingReducer'

export default function UpcomingSequences() {
  const sequences = useSelector(Sequence.selectors.getSequence)
  const latestSequences = sequences?.list?.[sequences.length - 1]
  const questions = useSelector(Question.selectors.getQuestion)
  const setting = useSelector(Setting.selectors.getSetting)

  const questionByTheme = groupBy(questions?.list, 'topic.theme.name')

  const sortedTheme = sortArrayAfterString(latestSequences?.theme?.name, themeOrder)
  sortedTheme.push(...sortedTheme)

  const arrayHourAndMinute = setting.launchSequenceTime?.split(':')
  const nextSequenceDate = moment()
    .day(setting.launchSequenceDay)
    .hour(arrayHourAndMinute?.[0])
    .minute(arrayHourAndMinute?.[1])
    .add(1, 'weeks')

  return (
    <div className="">
      <AppSecondaryHeader>Upcoming sequences</AppSecondaryHeader>
      <div className="">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Theme
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        # of questions
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Next sequence
                      </th>

                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {sortedTheme?.map((theme, i) => (
                      <tr
                        key={i}
                        className={classNames('', i % 2 === 0 ? '' : 'bg-gray-50 ')}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <ThemeBadge name={theme} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {questionByTheme[theme]?.length} questions
                        </td>
                        {/* here it is a bit more complicated than anticipated. Should we send every questions, topics to the front page for every user? we need it to know if everyone answered everything */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          On{' '}
                          {nextSequenceDate
                            ?.add(1, 'weeks')
                            ?.format('dddd, MMMM Do YYYY, h:mm a')}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {/* {theme.status === 'ongoing' ? (
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Mark as completed
                              <span className="sr-only">, {theme.name}</span>
                            </a>
                          ) : null} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
