import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
// import { useIsLogged, useIsAdminUser, useIsEngineer } from '../../utils'
import AppLayout from '../Layout'

export const PrivateRoute = () => {
  const auth = true // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  ) // todo
}
