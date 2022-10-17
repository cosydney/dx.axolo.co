import React from 'react'
import { Layout } from 'antd'
import InternalAppBody from './internalAppBody'
// import Header from '../Header/header'
// import HomeFooter from '../../pages/FooterHomepage/footerHomePage'
// import { useLocation } from 'react-router'
// import { useIsAdminUser, useIsEngineer } from '../../utils'

export default function AppLayout({ children, items }) {
  // const location = useLocation()

  const isAuthed = true

  return (
    <div className="">
      <div className="">
        {/* <Header /> */}
        <main className="">
          {isAuthed ? <InternalAppBody children={children} /> : null}
          {/* <HomeFooter /> */}
        </main>
      </div>
    </div>
  )
}
