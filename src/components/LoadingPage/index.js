import logo from '../../media/logo/logo_social_archiver_white.png'
import { useLocation } from 'react-router'
import { useEffectOnce } from 'react-use'
import { URLBACK } from '../../env'
import messageInteraction from '../messageInteraction'
import { useDispatch } from 'react-redux'
import { useAxiosWithHeader } from '../utils'
import { updateUser } from '../../reducers/userReducer'

function LoadingPage() {
  const location = useLocation()
  const axios = useAxiosWithHeader()
  const dispatch = useDispatch()

  async function setAppUser() {
    console.log('begin of set app user', location)
    if (location?.search?.includes('state=')) {
      const id = location?.search?.split('state=')?.[1]
      try {
        const { data: userData } = await axios.get(
          `${URLBACK}twitter/connect-user?state=${id}`,
        )
        console.log('user data', userData, userData.jwt)
        dispatch(
          updateUser({
            ...userData,
            loading: false,
            error: false,
            // jwt, isAdminUser
          }),
        )
      } catch (e) {
        console.log('Error setting up app user.', e)
        messageInteraction({
          type: 'error',
          content: 'Unable to set up app user.',
        })
        dispatch(
          updateUser({
            loading: false,
            error: true,
          }),
        )
      }
    }
  }
  useEffectOnce(() => {
    setAppUser()
  })

  return (
    <div className="flex h-screen w-screen justify-center pt-20 md:items-center md:pt-0">
      <div className="md:grid md:grid-cols-2 md:gap-4 md:px-10">
        <div className=" flex flex-shrink-0 items-center justify-center px-4 md:pr-8">
          <img className="h-40 w-auto md:h-56" src={logo} alt="Your Company" />
        </div>{' '}
        <div className="mx-10 text-sa-white md:mx-0 md:self-center">
          <p>loading in loadingpage</p>
          <button
            className="px-2 py-4"
            onClick={() => {
              setAppUser()
            }}
          >
            aaaaaa
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
