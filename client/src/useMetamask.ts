//This hook is to check wether the metamask is installed or not
const useMetamask = () => {

    const {ethereum} = window;
    return Boolean(ethereum && ethereum.isMetamask); //it will return true or false
}

export default useMetamask;