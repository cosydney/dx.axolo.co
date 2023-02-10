export default function HomeFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
          <span className="block sm:inline">
            &copy; {new Date().getFullYear()} DX by Axolo developed by IT IS CHAOS, Inc.
          </span>{' '}
          <span className="block sm:inline">All rights reserved.</span>
          <br />
        </div>
      </div>
    </footer>
  )
}
