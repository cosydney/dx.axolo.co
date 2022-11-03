import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import AppLayout from '../Layout'

export const PrivateRoute = () => {
  const auth = true

  return auth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  )
}
