import { cloneDeep, map } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { URLBACK } from '../../../env'
import { Member, updateMember } from '../../../reducers/memberReducer'
import { Organization } from '../../../reducers/organizationReducer'
import messageInteraction from '../../messageInteraction'
import { classNames, useAxiosWithHeader } from '../../utils'
import SeachMemberInput from './searchMemberInput'
import { updateOnboarding } from '../../../reducers/onboardingReducer'
import { User } from '../../../reducers/userReducer'
import { Tooltip } from 'antd'

export default function MemberSettingTable() {
  const members = useSelector(Member.selectors.getMember)
  const user = useSelector(User.selectors.selectUser)
  const [searchMemberInput, setSearchMemberInput] = useState('')
  const axios = useAxiosWithHeader()
  const organization = useSelector(Organization.selectors.getOrganization)
  const dispatch = useDispatch()

  // create a sortedMember array that takes each member and sort at the beginning each of them that have the iSActive property to true
  const sortedMembers = cloneDeep(members?.list)?.sort((a, b) => {
    if (a?.isActive === b?.isActive) {
      return 0
    }
    if (a?.isActive === true) {
      return -1
    }
    return 1
  })
  const [memberData, setMemberData] = useState(sortedMembers)

  useEffect(() => {
    setMemberData(sortedMembers)
  }, [members?.list, sortedMembers])

  const StatusBadgeMember = ({ isActive }) => {
    return (
      <span
        className={classNames(
          'inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800',
          !isActive && 'bg-red-100 text-red-800',
        )}
      >
        {isActive ? 'Active' : 'Not onboarded'}
      </span>
    )
  }

  async function OnOffboardMember({ person, action }) {
    const hide = messageInteraction({
      content:
        action === 'onboard'
          ? `Sending onboarding message to ${person.username}.`
          : `Sending offboarding notification to ${person.username}.`,
      type: 'loading',
    })
    try {
      const newMemberState = cloneDeep(members)
      const memberIndex = map(newMemberState.list, 'id').indexOf(person.id)
      newMemberState.list[memberIndex].isActive = !person.isActive
      dispatch(updateMember({ ...newMemberState }))
      await axios.put(
        `${URLBACK}members/onoffboard?orgId=${organization.id}&memberId=${person.id}&action=${action}`,
      )
      // This is to handle the onboarding step1
      const activeCount = newMemberState.list?.filter((m) => m?.isActive === true).length
      if (activeCount >= 2) {
        dispatch(updateOnboarding({ step1: true }))
      } else {
        dispatch(updateOnboarding({ step1: false }))
      }

      hide()
    } catch (e) {
      dispatch(updateMember({ ...members }))
      hide()
      console.log(`Error ${action}ing ${person.username}: ${e.message}, ${e}`)
      messageInteraction({
        content: `Error ${action}ing ${person.username}: ${e.message}`,
        type: 'error',
      })
    }
  }

  const ActionMemberTableComponent = ({ disabled, person }) => {
    if (person.isActive) {
      return (
        <Tooltip title={disabled ? 'Only admins can do this action' : ''}>

          <button
            href="#"
            disabled={disabled}
            onClick={() => OnOffboardMember({ person, action: 'offboard' })}
          >
            <span className="text-red-800">Offboard</span>
            <span className="sr-only">, {person.username}</span>
          </button>
        </Tooltip>
      )
    }
    return (
      <Tooltip title={disabled ? 'Only admin can do this action' : ''}>
        <button
          href="#"
          className=""
          disabled={disabled}
          onClick={() => OnOffboardMember({ person, action: 'onboard' })}
        >
          <span className="text-green-800">Onboard</span>
          <span className="sr-only">, {person.username}</span>
        </button>
      </Tooltip>
    )
  }

  useEffect(() => {
    if (typeof e !== 'string' && (!searchMemberInput || searchMemberInput === '')) {
      return
    }
    const value = searchMemberInput
    const reg = new RegExp(value, 'gi')

    const filteredData = map(sortedMembers, (person) => {
      const usernameMatch = person?.username?.match(reg)
      const roleMatch = person?.role?.name?.match(reg)
      const emailMatch = person?.email?.match(reg)
      if (!usernameMatch && !roleMatch && !emailMatch) {
        return null
      }
      return person
    }).filter((person) => !!person)
    setMemberData(filteredData)
  }, [searchMemberInput, members.list, sortedMembers])

  const isMember = user?.role?.name === 'Member'
  const shouldDisabledInput = isMember ? true : false
  return (
    <div className="mt-8 flex flex-col">
      <SeachMemberInput value={searchMemberInput} setValue={setSearchMemberInput} />

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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>

                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {memberData?.map(
                  (person) =>
                    person && (
                      <tr key={person.email}>
                        <td className="relative whitespace-nowrap pl-4  text-left text-sm font-medium sm:pl-6 ">
                          <div className="flex items-center  ">
                            <div className="h-10 w-10 flex-shrink-0 ">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={person?.avatarUrl}
                                alt=""
                              />
                            </div>
                            <div className="ml-4 ">
                              <div className="font-medium text-gray-900">
                                {person.username}
                              </div>
                              <div className="text-gray-500">{person.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <StatusBadgeMember isActive={person.isActive} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.isActive ? person.role?.name : null}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                          <ActionMemberTableComponent
                            disabled={shouldDisabledInput}
                            person={person}
                          />
                        </td>
                      </tr>
                    ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
