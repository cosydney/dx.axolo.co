import moment from 'moment'
import { useSelector } from 'react-redux'
import { Member } from '../../../reducers/memberReducer'

export default function TextAnswer({ answers }) {
  const members = useSelector(Member.selectors.getMember)

  return (
    <div className="">
      <div className="-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Answer
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {answers?.map((answer) => {
                  const member = members?.list?.find((m) => m.id === answer.answeredBy.id)
                  return (
                    <tr key={answer.id}>
                      <td className="relative whitespace-nowrap pl-4  text-left text-sm font-medium sm:pl-6 ">
                        <div className="flex items-center  ">
                          <div className="h-10 w-10 flex-shrink-0 ">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={member.avatarUrl}
                              alt=""
                            />
                          </div>
                          <div className="ml-4 ">
                            <div className="font-medium text-gray-900">
                              {member.username}
                            </div>
                            <div className="text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className=" px-3 py-4 text-sm text-gray-500">
                        <div className="">{answer.textAnswer}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {moment(answer.createdAt).format('DD/MM/YYYY')}
                        <br />
                        {moment(answer.createdAt).format('HH:mm')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
