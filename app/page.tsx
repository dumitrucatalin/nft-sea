import React from "react";
import Layout from "./components/Layout";
import MintNFT from "./components/MintNFT";
import Providers from "./providers";
import NFTMarketplace from "./components/NFTMarketplace";

export default function Home() {
    return (
        <Providers>
            <Layout>
                <MintNFT />
                {/* <NFTMarketplace /> */}
            </Layout>
        </Providers>
    );
}

