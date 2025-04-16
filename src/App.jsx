import './App.css';
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,

} from '@solana/wallet-adapter-wallets';
import { RequestAirdrop } from './RequestAirdrop';
import { ShowBal } from './ShowBal';
import { SendTokens } from './SendTokens';
import { SignMessage } from './SignMessage';


function App() {
    const network = WalletAdapterNetwork.Devnet;

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),

        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div >
                        <WalletMultiButton />
                        <ShowBal></ShowBal>
                        <RequestAirdrop></RequestAirdrop>
                        <SendTokens/>
                        <SignMessage/>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
