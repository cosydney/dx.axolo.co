import MainAppDiv from '../../Layout/mainAppDiv'
import { AppHeader, AppSubheader } from '../../utils'
import MemberSettingTable from './memberTable'

export default function TeamSetting() {
  return (
    <MainAppDiv>
      <AppHeader>Manage Members</AppHeader>
      <AppSubheader>
        On the Free plan, you can add as many members as you want.
      </AppSubheader>
      <MemberSettingTable />
    </MainAppDiv>
  )
}
