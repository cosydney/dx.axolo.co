import { useNavigate } from 'react-router'
import { classNames } from '../utils'

export default function SubHeaderMenuDesktop({
  isOnboarded,
  activePage,
  activeSubPage,
  setActiveSubPage,
  subNavigation,
}) {
  const navigate = useNavigate()
  return (
    <header className="py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center gap-8">
          <div className="col-span-2">
            <nav className="flex space-x-4">
              {isOnboarded
                ? subNavigation[activePage]?.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        activeSubPage === item.route ? 'text-white' : 'text-gray-300 ',
                        'rounded-md px-3 py-2  text-sm font-medium hover:cursor-pointer',
                      )}
                      aria-current={activeSubPage === item.route ? 'page' : undefined}
                      onClick={() => {
                        const newSubRoute = subNavigation[activePage].find(
                          (element) => element.route === item.route,
                        ).route
                        setActiveSubPage(newSubRoute)
                        navigate(`/${activePage}/${newSubRoute}`)
                      }}
                    >
                      {item.name}
                    </a>
                  ))
                : null}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
