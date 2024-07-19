"use client";
import React from "react";
import Layout from "./components/Layout";
import MintNFT from "./components/MintNFT";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../config'

const queryClient = new QueryClient()


export default function Home() {
  return (
    <>
      <Layout>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>

            <MintNFT />

          </QueryClientProvider>
        </WagmiProvider>

      </Layout>
    </>
  );
}

