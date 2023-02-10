import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import AppLayout from '../Layout'

export const PrivateRoute = () => {
  // todo auth
  const auth = true

  return auth ? (
    <AppLayout>
      <h1 className="bg-green-500">coucou test</h1>

      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  )
}
