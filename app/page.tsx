import React from "react";
import Layout from "./components/Layout";
import MintNFT from "./components/MintNFT";
import Providers from "./providers";

export default function Home() {
    return (
        <Providers>
            <Layout>
                <MintNFT />
            </Layout>
        </Providers>
    );
}

