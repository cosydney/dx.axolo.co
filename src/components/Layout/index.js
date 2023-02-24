import React from 'react'
import Header from '../header/header'
import HomeFooter from '../homeFooter'
import Onboarding from '../onboarding'

export default function AppLayout({ children, items }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-full w-full flex-col">
        <Header />
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-10 py-6 shadow ">{children}</div>
          </div>
        </main>
        <Onboarding></Onboarding>
        <HomeFooter />
      </div>
    </div>
  )
}
