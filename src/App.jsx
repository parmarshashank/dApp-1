import './App.css';
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
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
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        <h1 style={{ color: '#4CAF50' }}>Solana DApp</h1>

                        <div style={{ marginBottom: '20px' }}>
                            <WalletMultiButton style={{
                                margin: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#6200ea',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }} />
                            <WalletDisconnectButton style={{
                                margin: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#d32f2f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }} />
                        </div>

                        <ShowBal />
                        <RequestAirdrop />
                        <SendTokens />
                        <SignMessage/>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
