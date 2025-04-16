import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef } from "react";

export const SendTokens = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const addRef = useRef(null);
    const amtRef = useRef(null);

    async function sendTokens() {
        try {
            const recipientAddress = addRef.current.value.trim();
            const amount = parseFloat(amtRef.current.value.trim());

            if (!recipientAddress || isNaN(amount) || amount <= 0) {
                alert("Please enter a valid recipient address and a positive amount.");
                return;
            }

            const publicKey = wallet.publicKey;
            if (!publicKey) {
                alert("Connect your wallet first.");
                return;
            }

            const toPubkey = new PublicKey(recipientAddress);
            const lamports = amount * LAMPORTS_PER_SOL;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey,
                    lamports,
                })
            );

            const signature = await wallet.sendTransaction(transaction, connection);
            alert(`Transaction sent!\nSignature: ${signature}`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    return (
        <div style={{
            marginTop: '30px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'inline-block',
            textAlign: 'left'
        }}>
            <h2>Send SOL</h2>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Recipient Address"
                    ref={addRef}
                    style={{
                        padding: '8px',
                        width: '300px',
                        marginBottom: '8px',
                        display: 'block'
                    }}
                />
                <input
                    type="number"
                    placeholder="Amount (in SOL)"
                    ref={amtRef}
                    style={{
                        padding: '8px',
                        width: '300px',
                        marginBottom: '8px',
                        display: 'block'
                    }}
                />
                <button
                    onClick={sendTokens}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#388e3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};
