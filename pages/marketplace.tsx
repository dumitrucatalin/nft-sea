import Layout from '@/app/components/Layout';
import NFTMarketplace from '@/app/components/NFTMarketplace';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../config'

const queryClient = new QueryClient()


const SmartContractPage: React.FC = () => {
    return (
        <>
            <Layout>
                <NFTMarketplace />
            </Layout>
        </>

    );
}
export default SmartContractPage;
