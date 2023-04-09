import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@chakra-ui/react';
import { ABI, ADDRESS } from './ABI.js';

const ConnectWallet = ({ setAccount, setContract, setSigner }) => {
  const [connected, setConnected] = React.useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const account = accounts[0];
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);

        const network = await provider.getNetwork();

        if (network.chainId !== 5) { // Change 5 to the network ID of the network you deployed the contract to
          window.alert('Please switch to the correct network.');
          return;
        }

        const musicAwardNFT = new ethers.Contract(
          ADDRESS,
          ABI,
          signer
        );
        setContract(musicAwardNFT);

        setConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask or another compatible wallet to interact with this application.');
    }
  };

  return (
    <Button colorScheme="teal" onClick={connectWallet} disabled={connected}>
      {connected ? 'Wallet Connected' : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWallet;
