import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router'
import { Button } from 'antd'
import { User } from '../../reducers/userReducer'

export const Logout = () => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)

  useEffectOnce(() => {
    dispatch(User.actions.logout({}))
    setRedirect(true)
  })

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="pb-10 text-xl text-textWhite">
        You should be logged out automatically, or click on this button:
      </h1>
      <Link onClick={() => dispatch(User.actions.logout({}))} to={`/`}>
        <Button
          type="primary"
          className="border-none bg-primary text-textWhite hover:bg-indigo-700 hover:text-textWhite"
        >
          Go to home page
        </Button>
      </Link>
    </div>
  )
}
