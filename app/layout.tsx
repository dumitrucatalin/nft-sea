import "../styles/globals.css";

import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });

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
