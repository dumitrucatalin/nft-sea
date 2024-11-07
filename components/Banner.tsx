import React from 'react';

interface BannerProps {
    title: string;
    description: string;
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
    return (
        <div className="text-center bg-[#FFFFFF17] p-6 rounded-lg shadow-lg h-[200px] w-[80%] border border-[1px] border-[#FFFFFF]">
            <div className="flex-1">
                <h1 className="font-cinzel text-44 font-bold leading-64 gradient-text-gray">{title}</h1>
                <p className="font-opensans text-base mt-2">{description}</p>
            </div>
        </div>
    );
};

export default Banner;
