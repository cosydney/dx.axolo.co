import { useState } from 'react'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { TimePicker } from 'antd'
import { AppSecondaryHeader, updateSettingFromApp, useAxiosWithHeader } from '../../utils'
import DaySelector from './daySelect'
import { useDispatch, useSelector } from 'react-redux'
import { Setting } from '../../../reducers/settingReducer'
import { Organization } from '../../../reducers/organizationReducer'
import { User } from '../../../reducers/userReducer'
import { updateOnboarding } from '../../../reducers/onboardingReducer'

export default function DayTimeSetting() {
  const setting = useSelector(Setting.selectors.getSetting)
  const organization = useSelector(Organization.selectors.getOrganization)
  const user = useSelector(User.selectors.selectUser)
  const axios = useAxiosWithHeader()
  const dispatch = useDispatch()

  const [selectedDay, setSelectedDay] = useState(
    capitalize(setting?.launchSequenceDay) || 'tuesday',
  )
  const [selectedTime, setSelectedTime] = useState(setting?.launchSequenceTime || '14:00')

  const format = 'HH:mm'

  async function onChangeDay(value) {
    setSelectedDay(value.name)
    updateSettingFromApp({
      key: 'launchSequenceDay',
      value: value.name?.toLowerCase(),
      organization,
      setting,
      dispatch,
      axiosWithHeader: axios,
      user,
    })
  }

  async function onChangeTime(time) {
    if (!time) return
    setSelectedTime(time.format(format))
    updateSettingFromApp({
      key: 'launchSequenceTime',
      value: time.format('HH:mm:ss.SSS'),
      organization,
      setting,
      dispatch,
      axiosWithHeader: axios,
      user,
    })
    dispatch(updateOnboarding({ step2: true }))
  }

  return (
    <div className="">
      <AppSecondaryHeader>Day & time</AppSecondaryHeader>
      <div className="flex items-center">
        Send the survey to the team each{' '}
        <DaySelector selectedDay={selectedDay} onChangeDay={onChangeDay} /> at{' '}
        <TimePicker
          className="ml-2 w-24 border-gray-300 py-2 font-sans shadow-sm focus:ring-primary"
          defaultValue={dayjs(selectedTime, format)}
          format={format}
          onChange={onChangeTime}
          value={dayjs(selectedTime, format)}
          minuteStep={15}
        />
      </div>
    </div>
  )
}
