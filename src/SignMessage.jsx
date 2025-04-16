import { useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { ed25519 } from '@noble/curves/ed25519';
import bs58 from 'bs58'; // Don't forget to install this!

export const SignMessage = () => {
    const { publicKey, signMessage } = useWallet();
    const inputRef = useRef(null);

    async function sign() {
        try {
            if (!publicKey) throw new Error('Wallet not connected');
            if (!signMessage) throw new Error('Wallet does not support message signing');

            const message = inputRef.current.value;
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);

            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
                throw new Error('Message signature invalid');
            else
                alert(`Success! Signature: ${bs58.encode(signature)}`);
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <h2>Sign a Message</h2>
            <input
                type="text"
                placeholder="Enter the message"
                ref={inputRef}
                style={{ padding: '8px', width: '300px', marginRight: '10px' }}
            />
            <button
                onClick={sign}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#00796b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Sign
            </button>
        </div>
    );
};
