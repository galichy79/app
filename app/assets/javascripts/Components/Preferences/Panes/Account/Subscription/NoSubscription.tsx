import { FunctionComponent, useState } from 'react'
import { LinkButton, Text } from '@/Components/Preferences/PreferencesComponents/Content'
import Button from '@/Components/Button/Button'
import { WebApplication } from '@/UIModels/Application'
import { loadPurchaseFlowUrl } from '@/Components/PurchaseFlow/PurchaseFlowFunctions'

type Props = {
  application: WebApplication
}

const NoSubscription: FunctionComponent<Props> = ({ application }) => {
  const [isLoadingPurchaseFlow, setIsLoadingPurchaseFlow] = useState(false)
  const [purchaseFlowError, setPurchaseFlowError] = useState<string | undefined>(undefined)

  const onPurchaseClick = async () => {
    const errorMessage = 'There was an error when attempting to redirect you to the subscription page.'
    setIsLoadingPurchaseFlow(true)
    try {
      if (!(await loadPurchaseFlowUrl(application))) {
        setPurchaseFlowError(errorMessage)
      }
    } catch (e) {
      setPurchaseFlowError(errorMessage)
    } finally {
      setIsLoadingPurchaseFlow(false)
    }
  }

  return (
    <>
      <Text>You don't have a Standard Notes subscription yet.</Text>
      {isLoadingPurchaseFlow && <Text>Redirecting you to the subscription page...</Text>}
      {purchaseFlowError && <Text className="color-danger">{purchaseFlowError}</Text>}
      <div className="flex">
        <LinkButton className="min-w-20 mt-3 mr-3" label="Learn More" link={window.plansUrl as string} />
        {application.hasAccount() && (
          <Button className="min-w-20 mt-3" variant="primary" label="Subscribe" onClick={onPurchaseClick} />
        )}
      </div>
    </>
  )
}

export default NoSubscription
