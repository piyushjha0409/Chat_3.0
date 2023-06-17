import React from "react";
const useMetamask = ()=>{
    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetaMask)
}


export default useMetamask;