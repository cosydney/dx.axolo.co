import { useNavigate } from 'react-router'
import { navigation } from './roots'
import { classNames } from '../utils'

export default function HeaderMenuDesktop({
  isOnboarded,
  activePage,
  setActivePage,
  setActiveSubPage,
  subNavigation,
}) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center px-2 lg:px-0">
      <div className="flex-shrink-0">
        <img className="block h-14 w-14" src="/logo/22.png" alt="DX by Axolo" />
      </div>
      <div className="hidden lg:ml-10 lg:block">
        <div className="flex space-x-4">
          {isOnboarded
            ? navigation.map((item) => {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      activePage === item.route
                        ? 'bg-hoverPrimary text-white'
                        : 'text-white hover:bg-hoverPrimary ',
                      'rounded-md py-2 px-3 text-sm font-medium hover:text-gray-200',
                    )}
                    onClick={() => {
                      setActivePage(item.route)
                      setActiveSubPage(subNavigation[item.route][0].route)
                      navigate(`/${item.route}/${subNavigation[item.route][0].route}`)
                    }}
                    aria-current={activePage === item.route ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}
