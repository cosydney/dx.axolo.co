import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce } from 'react-use'
import getOrg from '../../components/auth/onboardUser'
import { User } from '../../reducers/userReducer'
import LoadingMessage from '../../components/loading'
import { Member } from '../../reducers/memberReducer'
import PublicLayout from '../PublicLayout'
import { Organization } from '../../reducers/organizationReducer'
import { LogOutButton } from '../../components/logoutButton'

export const SignIn = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const members = useSelector(Member.selectors.getMember)
  const organization = useSelector(Organization.selectors.getOrganization)

  const query = new URLSearchParams(location.search)
  const jwt = query.get('jwt')

  const [error, setError] = useState(false)

  useEffectOnce(() => {
    if (jwt) {
      dispatch(User.actions.setUser({ jwt }))
    }
    try {
      getOrg({ jwt, setError, dispatch, navigate }).then()
    } catch (error) {
      console.log('A***************************************')
      setError(error)
    }
  })

  const onboardedMembers = members?.list?.filter((m) => m?.isActive)
  if (!organization.loading) {
    if (!(onboardedMembers?.length > 0)) {
      navigate('/team/manage')
    } else {
      navigate('/answers/results')
    }
  }

  if (error || organization.error) {
    return (
      <PublicLayout>
        <div className="m-5 flex flex-col items-center justify-center">
          <p>Error Signin you in, please try again or contact support</p>
          <p>{error}</p>
          <div className={'mt-4'}>
            <LogOutButton></LogOutButton>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <LoadingMessage
        text={'Getting your organization information, loading questions...'}
      />
    </PublicLayout>
  )
}
