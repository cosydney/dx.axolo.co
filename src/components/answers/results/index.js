import MainAppDiv from '../../Layout/mainAppDiv'
import { AppHeader, AppSubheader } from '../../utils'
import SequenceTable from './answerSequenceTable'

export default function QuestionResults() {
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
