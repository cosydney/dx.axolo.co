import React from 'react'
import { useSelector } from 'react-redux'
import { User } from '../../reducers/userReducer'
import LoadingPage from '../LoadingPage'
import Header from '../header/header'

export default function AppLayout({ children, items }) {
  const user = useSelector(User.selectors.selectUser)
  // if (user.loading) return <LoadingPage />

  // return <h1 className="bg-yellow-500">coucou</h1>

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-full w-full flex-col">
        <Header />
        <main className="-mt-32">
          {/* todo loading? */}
          {/* {!user.loading ? */}
          {/* <InternalAppBody children={children} /> */}
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-10 py-6 shadow ">
              {/* <Layout.Content className="site-layout-background" style={{}}> */}
              <h1 className="h-96 bg-yellow-500">coucou</h1>
              {children}
              {/* </Layout.Content> */}
            </div>
          </div>
          {/* // : null} */}
        </main>
      </div>
    </div>
  )
}
