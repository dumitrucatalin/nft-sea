"use client"
import "../styles/globals.css";

import { Open_Sans } from "next/font/google";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../config'


const opensans = Open_Sans({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      {/* <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}> */}

      <body className={opensans.className}>{children}</body>

      {/* </QueryClientProvider>
      </WagmiProvider> */}


    </html>


  );
}
