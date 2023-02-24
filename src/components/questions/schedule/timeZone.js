import React from 'react'
import moment from 'moment'
import { Select } from 'antd'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { Organization } from '../../../reducers/organizationReducer'

const { Option, OptGroup } = Select

export default function TimeZone({ timeZone, width, disabled, handleTimeZoneChange }) {
  const organization = useSelector(Organization.selectors.getOrganization)
  const [timeZoneValue, setTimeZoneValue] = useState(timeZone)

  useEffect(() => {
    setTimeZoneValue(organization?.timeZone)
  }, [organization?.timeZone])

  function renderOptions() {
    const timezones = moment.tz.names()
    let mappedValues = {}
    let regions = []

    timezones.map((timezone) => {
      const splitTimezone = timezone.split('/')
      const region = splitTimezone[0]
      if (!mappedValues[region]) {
        mappedValues[region] = []
        regions.push(region)
      }
      mappedValues[region].push(timezone)
      return null
    })

    return regions.map((region) => {
      const options = mappedValues[region].map((timezone) => {
        return (
          <Option key={timezone} value={timezone}>
            {timezone}
          </Option>
        )
      })
      return (
        <OptGroup key={region} title={<div style={{ fontSize: 30 }}>{region}</div>}>
          {options}
        </OptGroup>
      )
    })
  }

  return (
    <Select
      onChange={handleTimeZoneChange}
      value={timeZoneValue}
      showSearch
      style={{
        width: width,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '0.25rem',
      }}
      defaultValue={organization.timeZone}
      disabled={disabled}
      size="large"
    >
      {renderOptions()}
    </Select>
  )
}
