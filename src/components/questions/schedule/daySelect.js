import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { classNames } from '../../utils'

const days = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 7, name: 'Sunday' },
]

export default function DaySelector({ disabled, selectedDay, onChangeDay }) {
  const value = days.find((day) => day.name === selectedDay)
  let inputStyle =
    'border-gray-300 bg-white w-full rounded-md border py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm'
  if (disabled) {
    inputStyle =
      'text-[#b8b8b8] border-[#d9d9d9] bg-[#f5f5f5] w-full rounded-md border py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm'
  }
  return (
    <Combobox disabled={disabled} as="div" value={value} onChange={onChangeDay}>
      <div className="relative mx-2 w-40">
        <Combobox.Input className={inputStyle} displayValue={(person) => person?.name} />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {days.map((person) => (
            <Combobox.Option
              key={person.id}
              value={person}
              className={({ active }) =>
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-primary text-white' : 'text-gray-900',
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={classNames('block truncate', selected && 'font-semibold')}
                  >
                    {person.name}
                  </span>

                  {selected && (
                    <span
                      className={classNames(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-primary',
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
