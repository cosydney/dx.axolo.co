import { classNames } from './internalAppBody'
import logo from '../../media/logo/logo_social_archiver_white.png'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { User } from '../../reducers/userReducer'

export const SidebarDesktop = ({ navigation }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="hidden border-r border-dark-gray  md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex min-h-0 flex-1 flex-col bg-sa-black">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 pl-6">
          <div className="flex flex-shrink-0 items-center px-4">
            <img className="h-20 w-auto" src={logo} alt="Your Company" />
          </div>
          <nav className="mt-10 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-sa-black text-sa-white'
                    : 'text-gray-300 hover:bg-gray-900 hover:text-sa-white',
                  'group flex items-center rounded-md px-2 py-2  font-medium',
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? 'text-sa-white'
                      : 'text-gray-400 group-hover:text-gray-300',
                    'mr-3 h-6 w-6 flex-shrink-0',
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        {/* Sidebar footer */}

        <button
          className="bg-sa-white px-8 py-3"
          onClick={() => {
            navigate('/')
            dispatch(User.actions.logout({}))
          }}
        >
          LOG OUT
        </button>
        {/*  */}
        <div className="flex flex-shrink-0 bg-sa-black p-4">
          <a href="#" className="group block w-full flex-shrink-0 pl-6">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className=" font-medium text-sa-white">name to do</p>
                <p className="text-xs font-medium text-light-gray group-hover:text-gray-200">
                  @username todo
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
