import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { User } from '../../../reducers/userReducer'
import { useSelector } from 'react-redux'
import { userNeedsToAnswerSurvey } from '../../utils'
import QuestionContainer from './questionContainer'
import { useEffectOnce } from 'react-use'

export default function ModalQuestion() {
  const user = useSelector(User.selectors.selectUser)
  const [open, setOpen] = useState(false)

  useEffectOnce(() => {
    const needsToAnswer = userNeedsToAnswerSurvey(user)
    setOpen(needsToAnswer)
  }, [user?.surveyRequests?.[0]])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative h-[60vh] max-h-[1000px] min-h-[400px]  min-w-[50vw]  transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <QuestionContainer />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
