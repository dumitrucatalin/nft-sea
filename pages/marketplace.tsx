import React from 'react';
import Layout from '../app/components/Layout';
import NFTMarketplace from '../app/components/NFTMarketplace';

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
