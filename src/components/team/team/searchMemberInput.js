import { UsersIcon } from '@heroicons/react/20/solid'

export default function SeachMemberInput({ value, setValue }) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Search members
      </label>
      <div className="mt-1 flex rounded-md  shadow-sm">
        <div className="relative flex flex-grow items-stretch  ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-none rounded-l-md border border-gray-200  py-2 pl-10 ring-0 focus:ring-0 sm:text-sm md:max-w-[350px]"
            placeholder="John Smith"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        {/* <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <BarsArrowUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Sort</span>
        </button> */}
      </div>
    </div>
  )
}
