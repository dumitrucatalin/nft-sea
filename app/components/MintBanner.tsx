import React from 'react';

const MintBanner: React.FC = () => {
    return (

        <div className="text-center bg-[#FFFFFF17] p-6 rounded-lg shadow-lg h-[200px] w-[80%] border border-[1px] border-[#FFFFFF]"
        >
            <div className="flex-1">
                <h1
                    className="font-cinzel text-44 font-bold leading-64 gradient-text-gray"
                >MINT New NFT</h1>
                <p className="font-opensans text-base mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem tortor quis amet scelerisque vivamus egestas.</p>
            </div>
        </div>
    );
};

export default MintBanner;
