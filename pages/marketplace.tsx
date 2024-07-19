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


            {/* <Layout>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}> */}

            {/* <NFTMarketplace />

                    </QueryClientProvider>
                </WagmiProvider>

            </Layout> */}


        </>

    );
}
export default SmartContractPage;
