// import { ethers } from 'ethers';
// import React from 'react';
// import { WagmiConfig, createClient, chain } from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected';

// const client = createClient({
//     autoConnect: true,
//     connectors: [
//         new InjectedConnector({
//             chains: [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
//         }),
//     ],
//     provider: ({ chainId }) => {
//         const network = chainId ? chainId : 1;
//         return ethers.getDefaultProvider(network);
//     },
// });

// const WagmiProvider: React.FC = ({ children }) => {
//     return <WagmiConfig client={client}>{children}</WagmiConfig>;
// };

// export default WagmiProvider;
