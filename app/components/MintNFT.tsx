"use client"
import React, { useState, ChangeEvent } from 'react';
import MintBanner from './MintBanner';

// Define types for the component state
interface MintNFTState {
    image: File | null;
    title: string;
    description: string;
}

const MintNFT: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Update to handle file input for images
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
    };

    const mintNFT = async () => {
        // Placeholder function for minting NFT
        console.log('Minting NFT with', { image, title, description });
        // Implement your smart contract interaction logic here
    };

    return (
        <div className="flex flex-col justify-center items-center bg-transparent">

            <MintBanner />

            <div className="text-center p-6 rounded-lg">
                <h1 className="text-xl font-bold text-white mb-4">Mint New NFT</h1>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="mb-4 p-2 bg-gray-700 text-white"
                />
                <input
                    type="text"
                    placeholder="NFT Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-2 bg-gray-700 text-white w-full"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4 p-2 bg-gray-700 text-white w-full"
                ></textarea>
                <button
                    onClick={() => mintNFT()}
                    className="text-white px-6 py-2 mr-2"
                >
                    Mint without listing
                </button>
                <button
                    onClick={() => mintNFT()} // Adjust if needed for different functionality
                    className="bg-gradient-to-r text-white px-6 py-2 min-h-[60px]"
                >
                    Mint and list immediately
                </button>
            </div>
        </div>
    );
}

export default MintNFT;
