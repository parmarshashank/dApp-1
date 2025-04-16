import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export const ShowBal = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                const bal = await connection.getBalance(publicKey);
                setBalance(bal);
            }
        };
        fetchBalance();
    }, [publicKey, connection]);

    return (
        <div style={{
            marginTop: '30px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'inline-block',
            textAlign: 'left'
        }}>
            <h2>Wallet Balance</h2>
            <p style={{
                fontSize: '18px',
                color: '#333',
                fontWeight: 'bold'
            }}>
                {publicKey
                    ? balance !== null
                        ? `💰 ${ (balance / LAMPORTS_PER_SOL).toFixed(4) } SOL`
                        : "Fetching..."
                    : "🔌 Connect your wallet to see balance"}
            </p>
        </div>
    );
};
