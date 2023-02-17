import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import AppLayout from '../Layout'
import { useSelector } from 'react-redux'
import { User } from '../../reducers/userReducer'

export const PrivateRoute = () => {
  const user = useSelector(User.selectors.selectUser)
  const auth = user?.jwt?.length > 0
  return auth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/" />
  )
}
