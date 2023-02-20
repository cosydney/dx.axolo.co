import { useState } from 'react'
import MainAppDiv from '../../Layout/mainAppDiv'
import ModalFeedback from '../../modalFeedback.js'
import { ActionButton, AppHeader, AppSubheader } from '../../utils'
import QuestionsTable from './questionTable'

export default function ManageContentQuestions() {
  const [open, setOpen] = useState(false)

  return (
    <MainAppDiv>
      <AppHeader>Manage Questions</AppHeader>
      <AppSubheader twCss="flex justify-between">
        Create and customize the questions for your developer experience survey.
        <ActionButton twCss="" onClick={() => setOpen(true)}>
          Edit questions
        </ActionButton>
      </AppSubheader>
      <ModalFeedback
        open={open}
        setOpen={setOpen}
        modalTitle="Edit questions are not available yet"
        modalText="Your feedback is important to us. Please let us know what you would like to see in the future."
      />
      <QuestionsTable />
    </MainAppDiv>
  )
}
