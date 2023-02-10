import React, { useState } from 'react'
import Axios from 'axios'
import { useEffectOnce, useLocation } from 'react-use'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { URLBACK } from '../../env'
import { updateUser } from '../../reducers/userReducer'
import { LogOutButton } from '../logoutButton'
import HomeFooter from '../homeFooter'
import { useNavigate } from 'react-router-dom'
// import { LogOutButton } from '../logoutButton'

export default function SlackAuth() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [Error, setError] = useState(false)
  const navigate = useNavigate()

  const loggingUser = async () => {
    try {
      const { data, status } = await Axios.get(
        `${URLBACK}services/auth/slack/callback${location.search}`,
      )
      console.log('data', data, 'status', status, 'location.search', location.search)
      const { user, jwt } = data

      if (status !== 200) {
        console.log('STATUS NOT 200', status, data)
        return
      }
      dispatch(updateUser({ ...user, jwt }))
      // window.$crisp.push(['set', 'user:email', user.email])
      // window.analytics.identify(user.email, {
      //   name: user.name,
      //   email: user.email,
      // })
    } catch (e) {
      console.log('Error in Slack Auth: ', e)
      console.log('e?.response?.data?.message', e?.response?.data?.message)
      if (
        e?.response?.data?.message?.[0]?.messages[0]?.id ===
        'Auth.form.error.email.taken.username'
      ) {
        setError('Same email different workspace.')
        return
      }

      if (typeof e?.response?.data?.message === 'string') {
        setError(e?.response?.data?.message)
      } else {
        setError('Something wrong just happened')
      }

      //if ok
      navigate('/app')
    }
  }

  useEffectOnce(() => {
    loggingUser().then()
  })

  const ErrorMessage = () => {
    return (
      <div className="flex flex-col items-center ">
        <h2 className="text-ourBlack mt-6 text-center text-3xl font-bold">
          There has been an error logging you in:
        </h2>
        <p className="mt-2 text-center text-sm text-ourGrey">Error: {Error}</p>
        <p className="mt-2 text-center text-sm text-ourGrey">
          Contact support or try again.
        </p>
        <LogOutButton />
      </div>
    )
  }

  const LoadingMessage = () => {
    return (
      <div className="">
        <h2 className="text-ourBlack mt-6 text-center text-3xl font-bold">Loading</h2>
        <div className="mt-24 flex justify-center">
          <Spin spinning />
        </div>
      </div>
    )
  }

  return (
    <div className=" h-screen bg-white">
      <div className="flex h-[88vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <img className="mx-auto h-12 w-auto" src="/logo_axolo.png" alt="Logo Axolo" />
          {Error ? <ErrorMessage /> : <LoadingMessage />}
        </div>
      </div>
      <HomeFooter />
    </div>
  )
}
