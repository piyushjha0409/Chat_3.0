import { ethers } from "ethers";
import { useState, useEffect } from "react";


const useChatContract = (
    contractAddress: string,
    web3ChatAbi: ethers.ContractInterface,
    account ?: string
): ethers.Contract | undefined => {

    const [signer , setSigner] = useState<ethers.JsonRpcApiProvider>();
    const [webthreeProvider, setWebThreeProvider] = useState<ethers.BrowserProvider>();

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
    }, [account, webthreeProvider])

    if(!contractAddress || !web3ChatAbi || !ethereum || !webthreeProvider){
        return;
    }

    return new ethers.Contract(
        contractAddress,
        web3ChatAbi,
        signer || webthreeProvider
    )
}

export default useChatContract;