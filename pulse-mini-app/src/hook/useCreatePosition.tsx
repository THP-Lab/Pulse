import { useCallback } from "react"
import { MiniKit } from "@worldcoin/minikit-js"
import { getClients } from "../lib/viemClient"
import { EthMultiVaultAbi } from "../multivault/ethmultivault-abi"

export function useCreatePosition() {
  const createPosition = useCallback(
    async ({
      vaultId,
      userAddress,
      onSetTransactionId,
    }: {
      vaultId: bigint
      userAddress: `0x${string}`
      onSetTransactionId?: (id: string) => void
    }) => {
      try {
        const { walletClient, publicClient } = await getClients()

        const multivault = new (await import("../multivault/ethmultivault")).EthMultiVault({
          walletClient,
          publicClient,
        })

        const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: multivault.contract.address,
              abi: EthMultiVaultAbi,
              functionName: "depositTriple",
              args: [userAddress, vaultId],
            },
          ],
        })

        if (finalPayload.status === "error") {
          throw new Error("Transaction failed via Worldcoin MiniKit")
        }

        if (onSetTransactionId) {
          onSetTransactionId(finalPayload.transaction_id)
        }

        return finalPayload.transaction_id
      } catch (err) {
        console.error("createPosition error:", err)
        throw err
      }
    },
    []
  )

  return { createPosition }
}
