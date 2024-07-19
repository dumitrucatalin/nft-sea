"use client"
import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SideDrawer } from "./SideDrawer";

export default function Layout({ children }: { children: React.ReactNode }) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <main className="flex min-h-screen flex-col items-space-between justify-between background-svg">

            <NavBar toggleWalletDrawer={toggleDrawer} />
            <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
            {children}
            <Footer />

        </main>
    );
}

// export default Layout;
