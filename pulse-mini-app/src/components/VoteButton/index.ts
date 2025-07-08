import { useCreatePosition } from '../src/hooks/useCreatePosition'

const VoteButton = ({ userAddress, vaultId }: { userAddress: string, vaultId: bigint }) => {
  const [buttonState, setButtonState] = useState<'pending' | 'success' | 'failed' | undefined>()
  const { createPosition } = useCreatePosition("your-app-id")

  const onVote = async () => {
    setButtonState('pending')

    try {
      const txId = await createPosition({
        userAddress,
        vaultId,
        onSetTransactionId: (id) => {
          console.log('Transaction ID:', id)
        },
      })

      console.log('Success, tx id:', txId)
      setButtonState('success')
    } catch (err) {
      setButtonState('failed')
      setTimeout(() => setButtonState(undefined), 3000)
    }
  }

  return (
    <LiveFeedback
      label={{
        pending: "Envoi du vote...",
        success: "Vote enregistré !",
        failed: "Échec du vote",
      }}
      state={buttonState}
    >
      <Button onClick={onVote} disabled={buttonState === 'pending'}>
        Voter
      </Button>
    </LiveFeedback>
  )
}
