import { ethers } from "ethers";
import { useState, useEffect } from "react";


const useChatContract = (
    contractAddress: string,
    web3ChatAbi: ethers.ContractInterface,
    account ?: string
): ethers.Contract | undefined => {

    const [signer , setSigner] = useState<ethers.JsonRpcSigner>();
    const [webthreeProvider, setWebThreeProvider] = useState<ethers.BrowserProvider>()

    const {ethereum} = window;

    useEffect(() => {
        if(ethereum){
            setWebThreeProvider(new ethers.BrowserProvider(window.ethereum))
        }
    }, [ethereum])

    useEffect(() => {
      if(webthreeProvider && account){
          setSigner(webthreeProvider.getSigner())
      }
    })
return new
}

export default useChatContract;