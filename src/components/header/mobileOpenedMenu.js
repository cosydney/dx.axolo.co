import { Disclosure } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Organization } from '../../reducers/organizationReducer'
import { User } from '../../reducers/userReducer'

import { classNames } from '../utils'
import { navigation, subNavigation } from './roots'

// menu that opens when you click on the menu icon on mobile
export default function MobileOpenedMenu({
  isOnboarded,
  activePage,
  setActivePage,
  setActiveSubPage,
  handleClick,
  avatar,
  userNavigation,
}) {
  const navigate = useNavigate()
  const user = useSelector(User.selectors.selectUser)
  const dispatch = useDispatch()
  const organization = useSelector(Organization.selectors.getOrganization)
  const orgName = organization?.providerLogin

  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {isOnboarded
          ? navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                onClick={() => {
                  setActivePage(item.route)
                  setActiveSubPage(subNavigation[item.route][0].route)
                  navigate(`/${item.route}/${subNavigation[item.route][0].route}`)
                }}
                className={classNames(
                  activePage === item.route
                    ? ' bg-hoverPrimary text-white'
                    : 'text-white',
                  'block rounded-md py-2 px-3 text-base font-medium',
                )}
                aria-current={activePage === item.route ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))
          : null}
      </div>
      <div className="border-t border-indigo-700 pt-4 pb-3">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-white">{orgName}</div>
            <div className="text-sm font-medium text-white">{user.email}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {/* Opened mobile menu navigation */}
          {userNavigation.map((item) => {
            const disabled = item.name === orgName
            // no need to show the org name in the list, we have it before
            if (disabled) return null
            if (!isOnboarded && item.name !== 'Log out') return

            return (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  'block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75',
                )}
                onClick={() => handleClick({ item, dispatch, disabled })}
              >
                {item.name}
              </Disclosure.Button>
            )
          })}
        </div>
      </div>
    </Disclosure.Panel>
  )
}
