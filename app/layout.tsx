"use client";
import "../styles/globals.css";

import { Open_Sans } from "next/font/google";
import NavBar from "../components/NavBar";
import { SideDrawer } from "../components/SideDrawer";
import Footer from "../components/Footer";
import { useState } from "react";
import Providers from "./providers";

const opensans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <html lang="en">
      <body className={opensans.className}>
        <main className="items-space-between background-svg flex min-h-screen flex-col justify-between">
          <Providers>
            <NavBar toggleWalletDrawer={toggleDrawer} />
            <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
