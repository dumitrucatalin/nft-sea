import Layout from '@/app/components/Layout';
import NFTMarketplace from '@/app/components/NFTMarketplace';
import React from 'react';

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
