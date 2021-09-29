import { useCallback, useEffect, useState, useContext } from 'react';
import { Web3WrapperContext } from '../contexts/Web3WrapperProvider';

const useAccountData = () => {
  const [accountData, setAccountData] = useState<any>(null);
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);

  const fetchAccountData = useCallback(async () => {
    if (wrapper) {
      try {
        const data = await wrapper.getAccountData();
        setAccountData(data);
        console.log("Account Data:", data);
      } catch (e) {
        console.log(e);
      }
    }
  }, [wrapper]);

  useEffect(() => {
    fetchAccountData();
    let refreshInterval = setInterval(fetchAccountData, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchAccountData]);

  return accountData;
}

export default useAccountData;