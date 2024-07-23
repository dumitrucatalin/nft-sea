"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${className}`}
  >
    {children}
  </button>
);

interface NavBarProps {
  toggleWalletDrawer: () => void;
  showMarketplace: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleWalletDrawer, showMarketplace }) => {
  return (
    <nav className="container mx-auto flex justify-between items-center p-4">
      <Link href="/" passHref onClick={showMarketplace}>
        <Image
          src="/nft-sea-logo.svg"
          alt="NFT Sea"
          width={199}
          height={70}
          priority
        />
      </Link>

      <div className="flex gap-4 px-6"
      >
        <p className="text-white font-opensans text-base">Explore Marketplace</p>
        <button onClick={toggleWalletDrawer}>
          <Image
            src="/wallet.svg"
            alt="wallet"
            width={23.33}
            height={21}
            priority
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
