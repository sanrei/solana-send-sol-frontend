import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import {useConnection, useWallet} from "@solana/wallet-adapter-react"
import {Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js"

export const SendSolForm: FC = () => {

    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()
    const transaction = new Transaction()

    const [txSig, setTxSig] = useState('')
    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : ""
    }

    const sendSol = event => {
        event.preventDefault()
        if (!connection || !publicKey) {return}
        const amount = event.target.amount.value
        const recipient = event.target.recipient.value

        const instruction = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipient),
            lamports: LAMPORTS_PER_SOL * amount,
        })

        transaction.add(instruction)

        sendTransaction(transaction, connection).then(sig => {
            console.log(sig)
            setTxSig(sig)
        })

        console.log(`Send ${amount} SOL to ${recipient}`)
    }

    return (
        <div>
            {
                publicKey ?
                <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
                </form> : 
                <span>Connect Your Wallet</span>

            }
            {
                txSig ? 
                <div>
                    <p>View your transaction on </p>
                    <a href={link()}>Solana Explorer</a>
                </div>
                    : null
            }
        </div>
    )
}