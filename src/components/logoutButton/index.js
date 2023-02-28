import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { User } from '../../reducers/userReducer'

export const LogOutButton = () => {
  const dispatch = useDispatch()
  return (
    <Link onClick={() => dispatch({ type: 'LOGOUT' })} to="/">
      <button
        to={`/`}
        type="primary"
        className="rounded-md border-none bg-primary px-3 py-1 text-textWhite hover:bg-indigo-700 hover:text-textWhite"
      >
        Log out
      </button>
    </Link>
  )
}
