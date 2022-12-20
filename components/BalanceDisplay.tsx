import {FC, useState, useEffect} from 'react'
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import {LAMPORTS_PER_SOL} from '@solana/web3.js'

export const BalanceDisplay: FC = () => {
    const {connection} = useConnection()
    const {publicKey} = useWallet()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (!connection || !publicKey) {return}
        connection.getAccountInfo(publicKey).then(info => setBalance(info.lamports))
    }, [connection, publicKey])

    return (
        <div>
            <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL}` : ''}</p>
        </div>
    )
}
