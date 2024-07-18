import React from 'react';
import { Dialog, DialogTitle } from '@headlessui/react';

interface MintedNFTDialogProps {
    isOpen: boolean;
    onClose: () => void;
    mintedNFT: {
        imageHash: string;
        title: string;
        description: string;
    } | null;
}

const MintedNFTDialog: React.FC<MintedNFTDialogProps> = ({ isOpen, onClose, mintedNFT }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
                <div className="inline-block bg-black border border-gray-700 rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full sm:w-48 mb-4">
                                {mintedNFT && (
                                    <img src={`https://ipfs.io/ipfs/${mintedNFT.imageHash}`} alt="Minted NFT" className="h-48 w-full object-cover rounded-md" />
                                )}

                            </div>
                            <DialogTitle as="h3" className="text-2xl leading-6 font-bold text-white mb-4">
                                {mintedNFT?.title}
                            </DialogTitle>
                            <div className="mt-2 text-center">
                                <p className="text-base text-gray-300">
                                    {mintedNFT?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black px-4 py-3 sm:px-6 flex justify-center">
                        <button
                            type="button"
                            className="bg-gradient-to-r justify-center bg-gradient-to-r text-base font-medium text-white w-44 h-[60px] rounded"
                            onClick={onClose}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default MintedNFTDialog;
