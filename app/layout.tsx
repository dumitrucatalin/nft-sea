"use client"
import "../styles/globals.css";

import { Open_Sans } from "next/font/google";

import { QueryClient } from '@tanstack/react-query'


const opensans = Open_Sans({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">


      <body className={opensans.className}>{children}</body>

    </html>


  );
}
