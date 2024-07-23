"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import MintBanner from './MintBanner';
import MintedNFTDialog from './MintedNFTDialog';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';
import Image from 'next/image';

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
            formData.append('title', title);
            formData.append('description', description);


            const response = await fetch('/api/uploadToPinata', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                const imageHash = data.IpfsHash;

                console.log('Image uploaded to IPFS with hash:', imageHash);

                writeContract({
                    address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
                    abi: parseAbi(['function mint(address to, string tokenURI_)']),
                    functionName: 'mint',
                    args: [address, imageHash],
                });
                setMintedNFT({ imageHash, title, description });
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
        }
        if (error) {
            setMessage(`Transaction error: ${error.message}`);
            setIsDialogOpen(true);
        }
    }, [isConfirming, isConfirmed, error]);

    return (
        <div className="flex flex-col justify-center items-center bg-transparent">
            <MintBanner />

            <div className="text-center p-6 rounded-lg max-w-[50vw]">
                <div className="relative mb-4 w-full min-h-[100px] bg-[#383838] border-1 border-[#9E9E9E] rounded flex flex-col items-center justify-center">
                    <label htmlFor="file-upload" className="flex items-center justify-center text-white cursor-pointer" >
                        <Image
                            src="/png/upload.png"
                            alt="NFT Sea"
                            width={20}
                            height={20}
                            priority
                            className="m-2"
                        />
                        <p className='text-base font-opensans'>Upload Image</p>
                    </label>
                    {/* <span className='text-base text-gray-500 font-opensans'>format supported</span> */}
                    <span className='text-base text-gray-500 font-opensans'>
                        {image?.name || 'Format supported'}
                    </span>
                    <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />
                </div>
                <input
                    type="text"
                    placeholder="NFT Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-2 text-white w-full min-h-[60px] bg-[#383838] border-1 border-[#9E9E9E] rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4 p-2 bg-[#383838] text-white w-full min-h-[160px] border-1 border-[#9E9E9E] rounded"
                ></textarea>
                <button
                    onClick={mintNFT}
                    className="text-white px-6 py-2 mr-2 rounded"
                    disabled={minting || isConfirming}
                >
                    {minting || isConfirming ? 'Processing...' : 'Mint without listing'}
                </button>

                <button
                    onClick={mintNFT}
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
