import { useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { User } from '../../reducers/userReducer'
import { Organization } from '../../reducers/organizationReducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { userMenu, subNavigation } from './roots'
import UserDropdown from './userDropDownDesktop'
import MobileOpenedMenu from './mobileOpenedMenu'
import HeaderMenuDesktop from './headerMenuDesktop'
import SubHeaderMenuDesktop from './subHeaderMenuDesktop'

export default function Header() {
  const organization = useSelector(Organization.selectors.getOrganization)
  const user = useSelector(User.selectors.selectUser)
  let avatar =
    'https://axolo.s3.eu-west-3.amazonaws.com/analytics/media-app/default-avatar.png'
  if (user.avatarUrl?.length > 0) {
    avatar = user.avatarUrl
  }

  const [avatarUrl, setAvatarUrl] = useState(avatar)
  const orgName =
    organization?.providerLogin || user?.credential?.teamName || 'Onboarding'
  const navigate = useNavigate()
  const userNavigation = userMenu(orgName)

  // this set the right navigation when you reload or enter a url
  const location = useLocation()
  let headerLocation = location?.pathname?.split('/')?.[1]
  let subHeaderLocation = location?.pathname?.split('/')?.[2]
  // this prevent a bug from the redirect after authentication from Home
  if (headerLocation === 'home') {
    headerLocation = 'settings'
    subHeaderLocation = 'pull-request-channel'
  }
  const [activePage, setActivePage] = useState(headerLocation)
  const [activeSubPage, setActiveSubPage] = useState(subHeaderLocation)

  useEffect(() => {
    setActivePage(headerLocation)
    setActiveSubPage(subHeaderLocation)
    if (user.avatarUrl?.length > 0) {
      setAvatarUrl(user.avatarUrl)
    }
  }, [headerLocation, subHeaderLocation])

  function handleClick({ item, dispatch, disabled }) {
    if (item.name === 'Log out') {
      if (process.env.NODE_ENV === 'production') {
        window.analytics.track('Sign out user')
      }
      dispatch(User.actions.logout({}))
    }
    if (!disabled && item.route) {
      setActivePage('admin')
      setActiveSubPage(item.route)
      navigate(`/admin/${item.route}`)
    }
  }

  return (
    <>
      <div className="min-h-full">
        <div className="bg-primary pb-32">
          <Disclosure
            as="nav"
            className="border-b border-hoverPrimary border-opacity-25 bg-primary lg:border-none"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-hoverPrimary lg:border-opacity-25">
                    <HeaderMenuDesktop
                      // todo
                      isOnboarded={true}
                      activePage={activePage}
                      setActivePage={setActivePage}
                      setActiveSubPage={setActiveSubPage}
                      subNavigation={subNavigation}
                    />
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    {/* Doc and User dropdow buttno on desktop */}
                    <UserDropdown
                      isOnboarded={true} //todo
                      avatar={avatarUrl}
                      handleClick={handleClick}
                      activeSubPage={activeSubPage}
                      userNavigation={userNavigation}
                    />
                  </div>
                </div>

                <MobileOpenedMenu
                  isOnboarded={true} //todo
                  activePage={activePage}
                  setActivePage={setActivePage}
                  setActiveSubPage={setActiveSubPage}
                  handleClick={handleClick}
                  avatar={avatarUrl}
                  userNavigation={userNavigation}
                />
              </>
            )}
          </Disclosure>
          <SubHeaderMenuDesktop
            isOnboarded={true} //todo
            activePage={activePage}
            activeSubPage={activeSubPage}
            setActiveSubPage={setActiveSubPage}
            subNavigation={subNavigation}
          />
        </div>
      </div>
    </>
  )
}
