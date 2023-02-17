import moment from 'moment'
import { useSelector } from 'react-redux'
import { Member } from '../../../reducers/memberReducer'
import { Sequence } from '../../../reducers/sequenceReducer'
import { classNames } from '../../utils'
import StatusBadge from './statusBadge'
import ThemeBadge from './themeBadge'

export default function SequenceTable() {
  const sequences = useSelector(Sequence.selectors.getSequence)
  const members = useSelector(Member.selectors.getMember)

  return (
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
                      Sent at
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Answers
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {sequences?.list?.map((sequence, i) => (
                    <tr
                      key={i}
                      className={classNames(
                        'hover:cursor-pointer hover:bg-gray-200',
                        i % 2 === 0 ? '' : 'bg-gray-50 ',
                      )}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <ThemeBadge name={sequence?.theme?.name} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {moment(sequence.launchDate).format('MMMM Do YYYY')}
                      </td>
                      {/* here it is a bit more complicated than anticipated. Should we send every questions, topics to the front page for every user? we need it to know if everyone answered everything */}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <StatusBadge name={sequence.status} />{' '}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {sequence.answers?.length}/{members?.list?.length}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {sequence.status === 'ongoing' ? (
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Mark as completed
                            {/* todo */}
                            <span className="sr-only">, {sequence.name}</span>
                          </a>
                        ) : null}
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
  )
}
