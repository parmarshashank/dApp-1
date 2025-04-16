import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const inputRef = useRef(null);

    async function requestAirdrop() {
        try {
            const publicKey = wallet.publicKey;
            const amt = parseFloat(inputRef.current.value.trim());

            if (!publicKey) {
                alert("Please connect your wallet first.");
                return;
            }

            if (isNaN(amt) || amt <= 0) {
                alert("Enter a valid amount of SOL.");
                return;
            }

            const sig = await connection.requestAirdrop(publicKey, amt * LAMPORTS_PER_SOL);
            alert(`Airdrop requested!\nTransaction Signature: ${sig}`);
        } catch (err) {
            alert(`Airdrop failed: ${err.message}`);
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
            <h2>Request Airdrop</h2>
            <input
                type="number"
                placeholder="Amount (SOL)"
                ref={inputRef}
                style={{
                    padding: '8px',
                    width: '200px',
                    marginBottom: '10px',
                    display: 'block'
                }}
            />
            <button
                onClick={requestAirdrop}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0288d1',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Request Airdrop
            </button>
        </div>
    );
}
