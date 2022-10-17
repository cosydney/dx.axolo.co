import React from 'react'
import { Layout } from 'antd'
import Header from '../Header/header'
import HomeFooter from '../../pages/FooterHomepage/footerHomePage'
import { useLocation } from 'react-router'
import { useIsAdminUser, useIsEngineer } from '../../utils'
import HeaderEngineer from '../HeaderEngineer/headerEngineer'

export default function AppLayout({ children, items }) {
  const location = useLocation()
  const isEngineer = useIsEngineer()
  const isAdminUser = useIsAdminUser()

  const AxoloBody = () => {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white px-10 py-6 shadow ">
          <Layout.Content className="site-layout-background" style={{}}>
            {children}
          </Layout.Content>
        </div>
      </div>
    )
  }

  const AnalyticsBody = () => {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Layout.Content className="site-layout-background" style={{}}>
          {children}
        </Layout.Content>
      </div>
    )
  }

  let isAxoloPage = true
  if (location?.pathname?.split('/')?.[1] === 'analytics') {
    isAxoloPage = false
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-full w-full flex-col">
        {/* Either engineer user or admin user */}
        {isEngineer && <HeaderEngineer />}
        {isAdminUser && <Header />}
        <main className="-mt-32">
          {isAxoloPage ? <AxoloBody /> : <AnalyticsBody />}
          <HomeFooter />
        </main>
      </div>
    </div>
  )
}
