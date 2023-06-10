import { ethers } from "ethers";
import { useState, useEffect } from "react";


const useChatContract = (
    contractAddress: string,
    web3ChatAbi: ethers.ContractInterface,
    account ?: string
): ethers.Contract | undefined => {

    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [webthreeProvider, setWebThreeProvider] = useState<ethers.providers.Web3Provider>();

    const {ethereum} = window;

    useEffect(() => {
        if(ethereum){
            setWebThreeProvider(new ethers.providers.Web3Provider(window.ethereum))
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