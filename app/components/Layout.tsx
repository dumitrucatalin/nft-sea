"use client"
import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SideDrawer } from "./SideDrawer";
import MintNFT from "./MintNFT";
import NFTMarketplace from "./NFTMarketplace";

export default function Layout({ children }: { children: React.ReactNode }) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showMintNFT, setShowMintNFT] = useState(true); // Default to show MintNFT component


    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleComponent = () => {
        setShowMintNFT(!showMintNFT);
    };

    const showMarketplace = () => {
        setShowMintNFT(false);
    };

    return (
        <main className="flex min-h-screen flex-col items-space-between justify-between background-svg">

            <NavBar toggleWalletDrawer={toggleDrawer} showMarketplace={showMarketplace} />
            <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
            {/* {children} */}

            {showMintNFT ? <MintNFT /> : <NFTMarketplace />}
            <Footer toggleComponent={toggleComponent} showMintNFT={showMintNFT} />

        </main>
    );
}

// export default Layout;
