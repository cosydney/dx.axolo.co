import { Fragment, useRef, useState } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import messageInteraction from '../messageInteraction'
import { URLBACK } from '../../env'
import { useSelector } from 'react-redux'
import { User } from '../../reducers/userReducer'
import { Organization } from '../../reducers/organizationReducer'
import { Member } from '../../reducers/memberReducer'

export default function ModalFeedback({
  open,
  setOpen,
  modalText = 'Put a text in me',
  modalTitle = 'I am a title',
}) {
  const user = useSelector(User.selectors.selectUser)
  const members = useSelector(Member.selectors.getMember)
  const organization = useSelector(Organization.selectors.getOrganization)
  const cancelButtonRef = useRef(null)
  const [textValue, setTextValue] = useState('')

  async function sendFeedback() {
    if (!(textValue?.length > 0)) {
      messageInteraction({
        type: 'error',
        content: `Please write a feedback before sending it.`,
      })
      return
    }
    try {
      const activeMembers = members?.list?.filter((member) => member.isActive)?.length
      const message = `${user.email}, from ${organization.name} with ${activeMembers}/${members?.list?.length} Slack users sent a feedback:\\n${textValue}`
      await axios.post(
        `${URLBACK}send-internal-message?text=${message}&slackChannel=dx-bot`,
      )
      messageInteraction({
        type: 'success',
        content: `Your feedback has been sent to our team. Thank you! 💖`,
      })
      setOpen(false)
    } catch (e) {
      console.log('Error sending feedback to our team', e.message, e)
      messageInteraction({
        type: 'error',
        content: `There was an error sending your feedback. Please send it in our chatbox.`,
      })
      setOpen(false)
    }
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ChatBubbleLeftIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {modalTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalText}</p>
                    </div>
                    <div className="mt-4">
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        placeholder="Help us improve DX by Axolo."
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => sendFeedback()}
                  >
                    Send comments
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
