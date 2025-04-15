import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
export function RequestAirdrop(){
    const wallet = useWallet();
    const {connection} = useConnection();
    const inputRef = useRef(null);
    function requestAirdrop() {
        const publicKey= wallet.publicKey;
        const amt= inputRef.current.value;
        connection.requestAirdrop(publicKey, amt*LAMPORTS_PER_SOL)
    }
    return (
        <div>
            <input type="text" placeholder="Amount..." ref={inputRef}></input>
            <button onClick={requestAirdrop}>Request Airdrop</button>
        </div>
    );
}