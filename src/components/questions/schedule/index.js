import MainAppDiv from '../../Layout/mainAppDiv'
import { AppHeader, AppSubheader } from '../../utils'
import DayTimeSetting from './dayTimeSetting'
import UpcomingSequences from './upcomingSequences'

export default function ScheduleQuestions() {
  return (
    <MainAppDiv>
      <AppHeader>Manage Programmation</AppHeader>
      <AppSubheader>
        Schedule and manage when your developer experience survey will be sent to your
        team.
      </AppSubheader>
      <DayTimeSetting />
      <UpcomingSequences />
    </MainAppDiv>
  )
}
