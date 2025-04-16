import { useWallet } from "@solana/wallet-adapter-react"
import { useRef } from "react";
import { ed25519 } from '@noble/curves/ed25519';


export const SignMessage = () => {
    const {publicKey, signMessage} = useWallet();
    const inputRef= useRef(null);
    async function sign() {
        if(!publicKey) throw new Error('Wallet not connected');
        if(!signMessage) throw new Error('Wallet does not support message signing');

        const message = inputRef.current.value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if(!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid');
        else   alert(`success message signature: ${bs58.encode(signature)}`);

        return (
            <div>
                <input type="text" placeholder="enter the message" ref={inputRef}> </input>
                <button onClick={sign}>Sign</button>
            </div>
        );
        
    }
}