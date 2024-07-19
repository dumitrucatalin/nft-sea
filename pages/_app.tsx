// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from "next/app";
import { WagmiProvider } from 'wagmi';
import { config } from '../config';
import { GlobalStateProvider } from '../context/GlobalStateProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from '../app/providers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchIntervalInBackground: false,
      retryOnMount: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  console.log('inside');

  return (
    <WagmiProvider config={config}>
      {/* <QueryClientProvider client={queryClient}> */}
      <GlobalStateProvider>
        <Providers>
          <Component {...pageProps} />
        </Providers>

      </GlobalStateProvider>
      {/* </QueryClientProvider> */}
    </WagmiProvider>
  );
}
