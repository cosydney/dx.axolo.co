import React from 'react'
import HomeFooter from '../../components/homeFooter'

export default function PublicLayout({ children, items }) {
  return (
    <div className=" h-screen bg-white">
      <div className="flex h-[88vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo/dx_full_logo.png"
            alt="Logo Axolo"
          />
          {children}
        </div>
      </div>
      <HomeFooter />
    </div>
  )
}
