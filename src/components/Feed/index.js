import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import { URLBACK } from '../../env'
import { updateUser, User } from '../../reducers/userReducer'
import FeedCard from '../FeedCard'
import messageInteraction from '../messageInteraction'
import { useAxiosWithHeader } from '../utils'

function Feed() {
  const axios = useAxiosWithHeader()
  const user = useSelector(User.selectors.selectUser)
  const dispatch = useDispatch()

  async function queryInfoForFeed() {
    try {
      const result = await axios.get(`${URLBACK}twitter/create-feed`)
      dispatch(
        updateUser({
          feedData: result.data,
        }),
      )
    } catch (e) {
      console.log(e)
      messageInteraction({
        type: 'error',
        content: 'Unable to fetch your feed.',
      })
    }
  }

  useEffectOnce(() => {
    queryInfoForFeed()
  })

  // if no data loading spinner
  if (user.feedData?.length === 0) {
    return (
      <div className="text-sa-white">
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => queryInfoForFeed()}
        >
          CLICK HERE TO LOAD FEED
        </button>{' '}
      </div>
    )
  }

  return (
    <div className="max-w-3xl text-sa-white">
      <div>
        {user.feedData?.map((data) => (
          <FeedCard data={data} />
        ))}
      </div>
    </div>
  )
}

export default Feed
