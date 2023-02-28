import { useSelector } from 'react-redux'
import { groupBy, capitalize } from 'lodash'
import { Question } from '../../../reducers/questionReducer'
import { Fragment, useState } from 'react'
import ThemeBadge from '../../answers/results/themeBadge'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import ModalFeedback from '../../modalFeedback.js'

export default function QuestionsTable() {
  const questions = useSelector(Question.selectors.getQuestion)
  const [open, setOpen] = useState(false)

  const questionByThemeThenTopic = groupBy(questions?.list, 'topic.theme.name')
  for (const [theme, value] of Object.entries(questionByThemeThenTopic)) {
    questionByThemeThenTopic[theme] = groupBy(
      questionByThemeThenTopic[theme],
      'topic.title',
    )
  }

  const QuestionStyle = ({ style }) => {
    if (style === 'textInput') {
      return <span className="text-gray-500">Text Input</span>
    }
    if (style === 'scale') {
      return <span className="text-gray-500">Scale</span>
    }
    if (style === 'boolean') {
      return <span className="text-gray-500">Yes/No</span>
    }
  }

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
                    Question
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Style
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Theme
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {Object.keys(questionByThemeThenTopic).map((theme, i) => (
                  <Fragment key={i}>
                    {Object.keys(questionByThemeThenTopic[theme]).map((topic, j) => (
                      <Fragment key={j}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={5}
                            scope="colgroup"
                            className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            {capitalize(topic)}
                          </th>
                        </tr>
                        {questionByThemeThenTopic?.[theme]?.[topic]?.map(
                          (question, k) => (
                            <tr key={k}>
                              <td className="    max-w-[600px] pl-4 text-left text-sm font-medium sm:pl-6  ">
                                <p className=" ml-4 font-medium text-gray-500">
                                  {question.text}
                                </p>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <QuestionStyle style={question.type} />
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <ThemeBadge name={theme} />
                              </td>
                              <td className="relative flex whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                                <button
                                  onClick={() => setOpen(true)}
                                  className="h-4 w-4 text-orange-600 hover:text-orange-900"
                                >
                                  <PencilIcon></PencilIcon>
                                </button>
                                <button
                                  onClick={() => setOpen(true)}
                                  className="h-4 w-4 text-red-600 hover:text-red-900"
                                >
                                  <TrashIcon />
                                  <span className="sr-only">, {question.name}</span>
                                </button>
                              </td>
                            </tr>
                          ),
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
            <ModalFeedback
              open={open}
              setOpen={setOpen}
              modalTitle="Edit and delete questions are not available yet"
              modalText="Your feedback is important to us. Please let us know what you would like to see in the future."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
