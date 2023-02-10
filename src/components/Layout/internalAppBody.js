import { useState } from 'react'
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { SidebarDesktop } from './sidebar-desktop'
import { Header } from './header'
import { SidebarMobile } from './sidebar-mobile'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Setting', href: '#', icon: Cog6ToothIcon, current: false },
]

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InternalAppBody({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="bg-sa-black">
        {/* Navigation while open on mobile */}
        <SidebarMobile
          navigation={navigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Static sidebar for desktop */}
        <SidebarDesktop navigation={navigation} />

        <div className="flex flex-1 flex-col md:pl-72">
          <div className="sticky top-0 z-10 bg-sa-black pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Header />
          <main className="flex-1">
            <div className="max-w-7xl  py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
            </div>
            {/* <HomeFooter /> */}
          </main>
        </div>
      </div>
    </>
  )
}
