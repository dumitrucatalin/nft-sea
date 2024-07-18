"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import MintBanner from './MintBanner';
import MintedNFTDialog from './MintedNFTDialog';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

const MintNFT: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [minting, setMinting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [mintedNFT, setMintedNFT] = useState<{ imageHash: string; title: string; description: string } | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
    };

    const { data: hash, error, isPending, writeContract } = useWriteContract();
    const { address } = useAccount();

    const mintNFT = async () => {
        if (!address) {
            setMessage('Please connect your wallet.');
            return;
        }

        if (!image) {
            setMessage('Please select an image to upload.');
            return;
        }

        setMinting(true);
        setMessage('Uploading image to IPFS...');

        try {
            const formData = new FormData();
            formData.append('file', image, image.name);

            const response = await fetch('/api/uploadToPinata', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                const imageHash = data.IpfsHash;

                console.log('Image uploaded to IPFS with hash:', imageHash);

                writeContract({
                    address: '0xc507d4FbD9b5Bd102668c00a3eF7ec68bF95C6A1',
                    abi: parseAbi(['function mint(address to, string tokenURI_)']),
                    functionName: 'mint',
                    args: [address, imageHash],
                });

                setMessage('Image uploaded to IPFS successfully. Waiting for transaction confirmation...');
            } else {
                setMessage('Failed to mint NFT.');
            }
        } catch (error) {
            console.error('Error uploading image to Pinata:', error);
            setMessage('Failed to mint NFT.');
        } finally {
            setMinting(false);
        }
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // React to changes in transaction states
    useEffect(() => {
        if (isConfirming) {
            setMessage('Confirming transaction...');
        }
        if (isConfirmed) {
            setMessage('Transaction confirmed.');
            setIsDialogOpen(true);
            setMintedNFT({ imageHash: hash!, title, description });
        }
        if (error) {
            setMessage(`Transaction error: ${error.message}`);
        }
    }, [isConfirming, isConfirmed, error]);

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
                    onClick={mintNFT}
                    className="text-white px-6 py-2 mr-2 rounded"
                    disabled={minting || isConfirming}
                >
                    {minting || isConfirming ? 'Processing...' : 'Mint without listing'}
                </button>

                <button
                    onClick={mintNFT} // Adjust if needed for different functionality
                    className="bg-gradient-to-r text-white px-6 py-2 min-h-[60px] rounded"
                    disabled={minting}
                >
                    {minting || isConfirming ? 'Processing...' : 'Mint and list immediately'}

                </button>
                {message && (
                    <p className="text-white mt-4 max-w-[80vw] max-h-[300px] overflow-auto break-words p-2">
                        {message}
                    </p>
                )}

            </div>
            <MintedNFTDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                mintedNFT={mintedNFT}
            />
        </div>
    );
};

export default MintNFT;
