import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Image
                    src="/nft-sea-logo.svg"
                    alt="NFT Sea"
                    width={199}
                    height={70}
                    priority
                />
                <span className="font-opensans text-base font-normal text-left"> NFT Sea 2024 © All rights reserved</span>

                <button className="bg-gradient-to-r text-white py-2 px-4 min-h-[60px] rounded">
                    Explore Marketplace
                </button>
            </div>
        </footer>
    );
};

export default Footer;
