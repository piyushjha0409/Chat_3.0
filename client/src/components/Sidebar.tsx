import * as React from 'react';
import useMetamask from '../useMetamask';

 interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
  account ?: string;
}
const Sidebar =  ({ setAccount, account }: Props) => {
  //using the hook
    const isMetaMaskInstalled = useMetamask(); //this will give either true or false

  return (
    <div className='sidebar'>
     <h1>This is the sidebar!</h1>
      {
        account ? (
          <>
          <b>Conected as:</b>
          <br />
          <small>{account}</small>
          </>
        ) : (
          <>
          <button disabled={!useMetamask}>Connect with Metamask</button>
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