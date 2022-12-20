import {FC, ReactNode} from "react"
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react"
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui"
import {PhantomWalletAdapter} from "@solana/wallet-adapter-phantom"
import {clusterApiUrl} from "@solana/web3.js"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode}> = ({children}) => {
    const endpoint = clusterApiUrl("devnet")
    const wallet = new PhantomWalletAdapter()

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[wallet]}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider
