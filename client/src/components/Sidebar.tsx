import * as React from 'react';
import { ethers } from 'ethers';
import useMetamask from '../useMetamask';
import Logo from "../logo2.svg"

 interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
  account ?: string;
}
const Sidebar =  ({ setAccount, account }: Props) => {

  //using the hook
  const isMetaMaskInstalled = useMetamask(); //this will give either true or false

  //function for handling the connection to metamask
  const handleConnection = () => {
    window.ethereum
    .request({
      method: "eth_requestAccounts"
    })
    .then((accounts: string[])=>{
      setAccount(ethers.utils.getAddress(accounts[0]))
    })
    .catch((err: any) => console.log(err))
  }

  return (
    <div className='sidebar'>
      <h1 className='logo'>
        <img src={Logo} alt="logo" />
      </h1>
      {
        account ? (
          <>
          <div className='connected_wallet'>
          <b>Welcome User!</b>
          <br />
          <small>{account}</small>
          </div>
          </>
        ) : (
          <>
          <button  onClick={handleConnection} disabled={!useMetamask}>Connect with Metamask</button>
          </>
        )
      }
      {
        !useMetamask && <p>Please Install Metamask</p>
      }
    </div>
  );
}

export default Sidebar;