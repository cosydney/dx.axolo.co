import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { classNames } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { Organization } from '../../reducers/organizationReducer'

const DocumentationButton = () => {
  return (
    <a
      href="https://axolo.co/docs"
      target="_blank"
      rel="noreferrer"
      className={classNames(
        'rounded-md py-2 px-3 text-sm font-medium text-white hover:text-gray-200',
      )}
    >
      <div className="flex">
        Documentation <ArrowTopRightOnSquareIcon className="ml-2 mt-1 w-4" />
      </div>
    </a>
  )
}

// menu top right of desktop view
export default function UserDropdown({
  isOnboarded,
  avatar,
  handleClick,
  activeSubPage,
  userNavigation,
}) {
  const dispatch = useDispatch()
  const organization = useSelector(Organization.selectors.getOrganization)
  const orgName = organization?.providerLogin

  return (
    <div className="hidden lg:ml-4 lg:block">
      {/* Profile dropdown and documentation button */}

      <div className="flex items-center">
        {/* Hide documentation button if not onboarded */}
        {/* {isOnboarded ? <DocumentationButton /> : null} */}
        <Menu as="div" className="relative z-50 ml-3 flex">
          <div>
            <Menu.Button className="flex rounded-full bg-primary text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
              <span className="sr-only">Open user menu</span>
              <img className="h-10 w-10 rounded-full" src={avatar} alt="user avatar" />
            </Menu.Button>
          </div>
          <div className="hidden border-t border-white border-opacity-20 py-5 lg:block"></div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userNavigation.map((item) => {
                // orgName does not have any menu or setting in the user navigation
                const disabled = item.name === orgName
                if (!isOnboarded && item.name !== 'Log out') return
                return (
                  <Menu.Item
                    key={item.name}
                    disabled={disabled}
                    onClick={() => handleClick({ item, dispatch, disabled })}
                  >
                    {({ active }) => (
                      <button
                        key={item.name}
                        className={classNames(
                          'block w-[inherit] px-4 py-2 text-left  text-sm text-gray-700',
                          // active means hover
                          active ? 'bg-gray-100' : '',
                          activeSubPage === item.route ? 'font-bold' : '',
                          disabled ? 'pointer-events-none border-b  ' : '',
                        )}
                      >
                        {item.name}
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
