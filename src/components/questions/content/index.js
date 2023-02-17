import MainAppDiv from '../../Layout/mainAppDiv'
import { AppHeader, AppSubheader } from '../../utils'
import QuestionsTable from './questionTable'

export default function ManageContentQuestions() {
  return (
    <MainAppDiv>
      <AppHeader>Manage Questions</AppHeader>
      <AppSubheader>
        Create and customize the questions for your developer experience survey.
      </AppSubheader>
      <QuestionsTable />
    </MainAppDiv>
  )
}
