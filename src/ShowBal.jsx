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
        <div>
            <h1>Balance</h1>
            <p>
                {publicKey
                    ? balance !== null
                        ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL`
                        : "Fetching..."
                    : "Connect your wallet to see balance"}
            </p>
        </div>
    );
};
