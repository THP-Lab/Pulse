// lib/viemClient.ts
import { createPublicClient, createWalletClient, http } from 'viem'
import { worldchain } from 'viem/chains'

export async function getClients() {


  const publicClient = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  })

  return {
    publicClient
  }
}
