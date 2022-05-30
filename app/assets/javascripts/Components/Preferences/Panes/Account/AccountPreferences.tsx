import { observer } from 'mobx-react-lite'
import { WebApplication } from '@/UIModels/Application'
import { AppState } from '@/UIModels/AppState'
import Authentication from './Authentication'
import Credentials from './Credentials'
import Sync from './Sync'
import Subscription from './Subscription/Subscription'
import SignOutWrapper from './SignOutView'
import FilesSection from './Files'
import PreferencesPane from '../../PreferencesComponents/PreferencesPane'

type Props = {
  application: WebApplication
  appState: AppState
}

const AccountPreferences = ({ application, appState }: Props) => (
  <PreferencesPane>
    {!application.hasAccount() ? (
      <Authentication application={application} appState={appState} />
    ) : (
      <>
        <Credentials application={application} appState={appState} />
        <Sync application={application} />
      </>
    )}
    <Subscription application={application} appState={appState} />
    {application.hasAccount() && appState.features.hasFiles && <FilesSection application={application} />}
    <SignOutWrapper application={application} appState={appState} />
  </PreferencesPane>
)

export default observer(AccountPreferences)
