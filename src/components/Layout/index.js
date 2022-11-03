import React from 'react'
import InternalAppBody from './internalAppBody'
import { useSelector } from 'react-redux'
import { User } from '../../reducers/userReducer'
import LoadingPage from '../LoadingPage'

export default function AppLayout({ children, items }) {
  const user = useSelector(User.selectors.selectUser)
  if (user.loading) return <LoadingPage />

  return (
    <div className="">
      <div className="">
        <main className="">
          {!user.loading ? <InternalAppBody children={children} /> : null}
        </main>
      </div>
    </div>
  )
}
