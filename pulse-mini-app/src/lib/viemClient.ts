// lib/viemClient.ts
import { createPublicClient, createWalletClient, http } from 'viem'
import { worldchain } from 'viem/chains'
import { injected } from 'viem/wallet'

export async function getClients() {
  const walletClient = createWalletClient({
    chain: worldchain,
    transport: injected(),
  })

  const publicClient = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  })

  return {
    walletClient: await walletClient.requestAddresses().then(() => walletClient),
    publicClient
  }
}
