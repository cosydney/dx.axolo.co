import React from 'react'
import HomeFooter from '../homeFooter'
import { LogOutButton } from '../logoutButton'

export default function Error404() {
  return (
    <div className="h-[100vh] bg-white">
      <div className="flex h-[88vh] flex-col justify-center bg-white py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <img className="mx-auto h-12 w-auto" src="/logo/22.png" alt="Logo Axolo" />
          <h2 className="text-ourBlack mt-6 text-center text-3xl font-bold">
            How did we send you here?
          </h2>
          <p className="mt-2 text-center text-sm text-ourGrey">
            You're a traveler from the future, this page does not exist yet!
          </p>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <LogOutButton />
        </div>
      </div>
      <HomeFooter />
    </div>
  )
}
