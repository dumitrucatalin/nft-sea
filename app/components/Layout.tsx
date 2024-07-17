"use client"
import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SideDrawer } from "./SideDrawer";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '../../config'

const queryClient = new QueryClient()


export default function Layout({ children }: { children: React.ReactNode }) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <main className="flex min-h-screen flex-col items-space-between justify-between background-svg">

            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <NavBar toggleWalletDrawer={toggleDrawer} />
                    <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
                    {children}
                    <Footer />
                </QueryClientProvider>
            </WagmiProvider>


        </main>
    );
}

// export default Layout;
