import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import MainAppDiv from '../../Layout/mainAppDiv'
import { AppHeader, AppSubheader } from '../../utils'
import SequenceTable from './answerSequenceTable'
import { useEffectOnce } from 'react-use'

export default function QuestionResults() {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffectOnce(() => {
    removeJWTParam()
  })

  const removeJWTParam = () => {
    if (searchParams.has('jwt')) {
      searchParams.delete('jwt')
      setSearchParams(searchParams)
    }
  }

  return (
    <MainAppDiv>
      <AppHeader>Explore Past Survey Results by Theme</AppHeader>
      <AppSubheader>
        Easily navigate and compare feedback from all the different themes to gain a
        comprehensive understanding of your team's experience.
      </AppSubheader>
      <SequenceTable />
    </MainAppDiv>
  )
}
