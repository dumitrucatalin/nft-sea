"use client";

import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract, useReadContracts, BaseError } from 'wagmi';
import { parseAbi } from 'viem';
import axios from 'axios';

const NFTMarketplace = () => {
    const [contractConfigs, setContractConfigs] = useState<any[]>([]);
    const [nftData, setNftData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { address } = useAccount();

    // Fetch total number of NFTs
    const { data: idCounter, error: idCounterError, isLoading: idCounterLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
        abi: parseAbi(['function idCounter() view returns (uint256)']),
        functionName: 'idCounter',
        args: [],
    });

    useEffect(() => {
        if (!idCounter || idCounterLoading || idCounterError) return;

        const count = parseInt(idCounter.toString());
        const configs = [];

        for (let i = 1; i <= count; i++) {
            configs.push({
                address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
                abi: parseAbi(['function tokenURI(uint256 tokenId) view returns (string)']),
                functionName: 'tokenURI',
                args: [BigInt(i)],
            });
        }

        setContractConfigs(configs);
    }, [idCounter, idCounterLoading, idCounterError]);

    // Fetch all URIs using useReadContracts
    const { data, error, isLoading: urisLoading } = useReadContracts({
        contracts: contractConfigs,
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            if (data) {
                const uris = data.map((uri: any) => uri?.result?.toString()).filter(Boolean);

                const ipfsPattern = /^https:\/\/ipfs.io\/ipfs\/Qm[1-9A-HJ-NP-Za-km-z]{44}$/;

                const metadataPromises = uris
                    .filter(uri => {
                        if (!ipfsPattern.test(uri)) {
                            console.error(`Invalid URI format: ${uri}`);
                            return false;
                        }
                        return true;
                    })
                    .map(async (uri: string) => {
                        const nftHash = uri.split('https://ipfs.io/ipfs/')[1];
                        if (nftHash) {
                            try {
                                const response = await axios.get(`https://ipfs.io/ipfs/${nftHash}`);
                                return response.data;
                            } catch (error) {
                                console.error(`Error fetching metadata for ${nftHash}:`, error);
                                return null;
                            }
                        }
                        return null;
                    });

                try {
                    const metadataResponses = await Promise.all(metadataPromises);
                    const metadata = metadataResponses.filter(Boolean); // Filter out null values
                    setNftData(metadata);
                    console.log('metadata:', metadata);

                } catch (error) {
                    console.error('Error fetching metadata from IPFS:', error);
                }

                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, [data]);

    if (idCounterLoading || urisLoading || isLoading) {
        return <p>Loading NFTs...</p>;
    }

    if (error || idCounterError) {
        return (
            <div>
                Error: {(error as BaseError)?.shortMessage || error?.message || (idCounterError as unknown as BaseError)?.shortMessage || idCounterError?.message}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {nftData.map((nft, index) => (
                <div key={index} className="border p-4">
                    {nft.image && (
                        <img src={nft.image} alt={`NFT ${index + 1}`} />
                    )}
                    <p>{nft.name}</p>
                    <p>{nft.description}</p>
                </div>
            ))}
        </div>
    );
};

export default NFTMarketplace;
