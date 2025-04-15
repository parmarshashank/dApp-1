import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef } from "react";

export const SendTokens = () => {
    const wallet = useWallet();
    const {connection } = useConnection();
    const addRef = useRef(null);
    const amtRef = useRef(null);

    async function sendTokens() {
        const recipientAddress = addRef.current.value;
        const amount = amtRef.current.value;
        const publicKey = wallet.publicKey;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientAddress,
            lamports: amount * LAMPORTS_PER_SOL,
        }));
        await wallet.sendTransaction(transaction, connection);
        alert("Transaction sent!");
    }

    return (
        <div>
            <h1>Send Tokens</h1>
            <input type="text" placeholder="Recipient Address" ref={addRef}></input>
            <input type="text" placeholder="Amount" ref={amtRef}></input>
            <button onClick={sendTokens}>Send</button>
        </div>
    );
}