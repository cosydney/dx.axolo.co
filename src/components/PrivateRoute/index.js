import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import AppLayout from '../Layout'
import { useSelector } from 'react-redux'
import { User } from '../../reducers/userReducer'
import ModalQuestion from '../questionMenu/modalQuestion'
import { userNeedsToAnswerSurvey } from '../utils'

export const PrivateRoute = () => {
  const user = useSelector(User.selectors.selectUser)
  const auth = user?.jwt?.length > 0

  // handling is users need to answer a survey
  // if (auth) {
  //   const needsToAnswer = userNeedsToAnswerSurvey(user)
  //   if (needsToAnswer) {
  //     return (
  //       <AppLayout>
  //         <ModalQuestion />
  //         <Outlet />
  //       </AppLayout>
  //     )
  //   }
  // }

  return auth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/" />
  )
}
