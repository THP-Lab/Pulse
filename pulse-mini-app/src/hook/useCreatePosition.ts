import { useCallback } from "react"
import { MiniKit } from "@worldcoin/minikit-js"
import { getClients } from "../lib/viemClient"
import { EthMultiVaultAbi } from "../multivault/ethmultivault-abi"

export function useCreatePosition(appId: string) {
  const createPosition = useCallback(
    async ({
      vaultId,
      userAddress,
      onSetTransactionId,
    }: {
      vaultId: bigint
      userAddress: `0x${string}`
      onSetTransactionId: (id: string) => void
    }) => {
      try {
        const { walletClient, publicClient } = await getClients()
        const multivault = new (await import("../multivault/ethmultivault")).EthMultiVault({
          walletClient,
          publicClient,
        })

        const amount = await multivault.getAtomCost() 

        const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: multivault.contract.address,
              abi: EthMultiVaultAbi,
              functionName: "depositTriple",
              args: [userAddress, vaultId],
              // PAS de value ici : Worldcoin sponsorise le gas
            },
          ],
        })

        if (finalPayload.status === "error") {
          throw new Error("Worldcoin TX error")
        }

        onSetTransactionId(finalPayload.transaction_id)
        return finalPayload.transaction_id
      } catch (err) {
        console.error("Error during createPosition with Worldcoin:", err)
        throw err
      }
    },
    [appId]
  )

  return { createPosition }
}
