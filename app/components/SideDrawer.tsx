import * as React from 'react';
import { useChainId, useConnect, useAccount, useDisconnect, Connector } from 'wagmi';
import Image from 'next/image';

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
    const chainId = useChainId();
    const { connectors, connect } = useConnect();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const drawerRef = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const connectorMapping: { [key: string]: string } = {
        MetaMask: 'MetaMask',
        WalletConnect: 'WalletConnect',
        Portis: 'Portis',
        Torus: 'Torus',
        Walletlink: 'Walletlink',
    };

    const getConnector = (name: string): Connector | undefined => {
        return connectors.find((connector) => connector.name === connectorMapping[name]);
    };

    const handleConnect = (name: string) => {
        const connector = getConnector(name);
        if (connector) {
            connect({ connector, chainId });
        }
    };

    return (
        <div
            ref={drawerRef}
            className={`fixed top-0 right-0 w-[400px] h-full bg-black text-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-xl font-bold">Connect Wallet</h2>
                <button onClick={onClose} className="text-white text-2xl">
                    &times;
                </button>
            </div>
            <div className="p-4">
                {isConnected ? (
                    <div className="text-center">
                        <p className="text-lg text-green-500">Wallet Connected</p>
                        <p className="text-sm text-gray-500">{address}</p>
                        <button
                            onClick={() => disconnect()}
                            className="w-full bg-red-600 text-white py-2 rounded-lg mt-4"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <>
                        <button
                            className="w-full bg-[#282828] text-white py-2 rounded-lg mb-4 flex items-center justify-center space-x-2"
                            onClick={() => handleConnect('MetaMask')}
                        >
                            <Image src="/png/metamask.png" alt="Metamask" width={24} height={24} priority />
                            <span className="text-20">Connect Metamask</span>
                        </button>
                        <button
                            className="w-full bg-[#282828] text-white py-2 rounded-lg mb-4 flex items-center justify-center space-x-2"
                            onClick={() => handleConnect('Portis')}
                        >
                            <Image src="/png/portis.png" alt="Portis" width={24} height={24} priority />
                            <span className="text-20">Connect Portis</span>
                        </button>
                        <button
                            className="w-full bg-[#282828] text-white py-2 rounded-lg mb-4 flex items-center justify-center space-x-2"
                            onClick={() => handleConnect('Torus')}
                        >
                            <Image src="/png/torus.png" alt="Torus" width={24} height={24} priority />
                            <span className="text-20">Connect Torus</span>
                        </button>
                        <button
                            className="w-full bg-[#282828] text-white py-2 rounded-lg mb-4 flex items-center justify-center space-x-2"
                            onClick={() => handleConnect('WalletConnect')}
                        >
                            <Image src="/walletlink.svg" alt="Walletlink" width={24} height={24} priority />
                            <span className="text-20">Connect Walletlink</span>
                        </button>
                    </>
                )}
                <p className="text-sm text-gray-500 mt-4">
                    Don't have a wallet? <a href="#" className="text-gradient-purple">Learn more</a>
                </p>
            </div>
        </div>
    );
}
