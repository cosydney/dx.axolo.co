import { useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import getOrg from '../../components/auth/onboardUser'
import { User } from '../../reducers/userReducer'
import LoadingMessage from '../../components/loading'
import { Member } from '../../reducers/memberReducer'

export const SignIn = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const members = useSelector(Member.selectors.getMember)

  const query = new URLSearchParams(location.search)
  const jwt = query.get('jwt')

  const [error, setError] = useState(false)

  useEffectOnce(() => {
    if (jwt) {
      dispatch(User.actions.setUser({ jwt }))
    }
    getOrg({ jwt, setError, dispatch, navigate })
  })

  const onboardedMembers = members?.list?.filter((m) => m?.isActive)
  if (!(onboardedMembers?.length > 0)) {
    navigate('/team/manage')
  } else {
    navigate('/answers/results')
  }

  if (error) {
    return (
      <>
        <p>Error Signin you in, please try again or contact support</p>
        <p>{error}</p>
      </>
    )
  }

  return (
    <LoadingMessage
      text={'Getting your organization information, loading questions...'}
    />
  )
}
