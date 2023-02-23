import { useSelector } from 'react-redux'
import { URLBACK } from '../env'
import { User } from '../reducers/userReducer'
import axios from 'axios'
import { updateSetting } from '../reducers/settingReducer'
import messageInteraction from './messageInteraction'

export function createAxios(jwt) {
  return axios.create({
    baseURL: URLBACK,
    headers: { Authorization: `Bearer ${jwt}` },
  })
}

export function useAxiosWithHeader() {
  const jwt = useSelector(User.selectors.selectJWT)
  return createAxios(jwt)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export function AppHeader({ children }) {
  return (
    <div className="max-w-7xl">
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
        {children}
      </h1>
    </div>
  )
}

export function AppSubheader({ children, twCss = '' }) {
  return (
    <p className={classNames('mt-2  text-sm text-gray-700', twCss?.length > 0 && twCss)}>
      {children}
    </p>
  )
}

export function AppSecondaryHeader({ children }) {
  return (
    <div className="mt-8 max-w-7xl">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        {children}
      </h1>
    </div>
  )
}

export function QuestionHeading({ children }) {
  return (
    <div className="mt-8 max-w-7xl">
      <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-700">
        {children}
      </h1>
    </div>
  )
}

export const themeColors = {
  'code review': { bg: 'bg-blue-100', text: 'text-blue-800' },
  testing: { bg: 'bg-green-100', text: 'text-green-800' },
  'engineering system': { bg: 'bg-orange-100', text: 'text-orange-800' },
  'company organization': { bg: 'bg-red-100', text: 'text-red-800' },
}

export const statusColors = {
  ongoing: { bg: 'blue-100', text: 'blue-800' },
  completed: { bg: 'green-100', text: 'green-800' },
}

export async function updateSettingFromApp({
  key,
  value,
  organization,
  setting,
  dispatch,
  axiosWithHeader,
  user,
}) {
  const usersId = organization.users?.map((user) => user.id)
  // if (!usersId.includes(user.id) || setting.id !== organization.setting.id) {
  //   messageInteraction({
  //     type: 'error',
  //     message: 'You are not allowed to update this setting',
  //   })
  //   return
  // }
  const oldValue = setting[key]
  try {
    dispatch(updateSetting({ ...setting, [key]: value }))
    await axiosWithHeader.put(`${URLBACK}settings/${setting.id}`, {
      data: { [key]: value },
    })
  } catch (e) {
    dispatch(updateSetting({ ...setting, [key]: oldValue }))
    messageInteraction({
      type: 'error',
      message: `Error updating your settings: ${key}`,
    })
    console.log('Error updating settings', e)
  }
}

export const themeOrder = [
  'code review',
  'engineering system',
  'testing',
  'company organization',
]

export function sortArrayAfterString(string, array) {
  const index = array.indexOf(string)
  if (index === -1) {
    // string not found in array, return the original array
    return array
  }
  const nextIndex = (index + 1) % array.length // index of the next item, wrapping around to the start if necessary
  const sortedArray = array.slice(nextIndex).concat(array.slice(0, nextIndex))
  return sortedArray
}

export function ActionButton({ children, twCss = '', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary focus:ring-offset-2',
        twCss?.length > 0 && twCss,
      )}
    >
      {children}
    </button>
  )
}

export function userNeedsToAnswerSurvey(user) {
  const { surveyRequests } = user
  // the backend sends the latest survey request first
  const latestSurveyRequest = surveyRequests?.[0]
  // if user needs to answer a sequence
  if (
    latestSurveyRequest?.answered ||
    latestSurveyRequest?.sequence?.status === 'completed'
  )
    return false
  return true
}
