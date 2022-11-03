import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const Header = () => {
  return (
    <header className="my-6 border-b border-dark-gray pl-4 ">
      <div className="flex max-w-7xl items-center justify-between pl-2 pr-4 pb-6  lg:px-8">
        <h1 className="text-2xl font-semibold text-sa-white">Home</h1>
        <div className="w-full max-w-xs pl-6 sm:pl-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-light-gray"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-3xl border border-light-gray bg-dark-gray py-2 pl-10 pr-3 leading-5 text-sa-white placeholder-light-gray focus:border-primary focus:placeholder-light-gray focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
