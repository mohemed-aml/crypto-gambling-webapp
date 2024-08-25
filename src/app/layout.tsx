// /src/app/layout.tsx

'use client'
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum] as const

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({ wagmiConfig: config, projectId })

// 4. Create a client
const queryClient = new QueryClient()

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Providers>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <Navbar/>
                {children}
              </QueryClientProvider>
            </WagmiProvider>
          </Providers>
        </RecoilRoot>
        
      </body>
    </html>
  );
}