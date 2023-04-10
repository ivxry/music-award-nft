import React, { useState } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import ConnectWallet from './components/ConnectWallet';
import ApproveMinter from './components/ManageMinter';
import MintAward from './components/MintAward';
import SendAward from './components/SendAward';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);


  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <h1>Music Award NFT</h1>
        </header>
        <main className="App-main">
          <ConnectWallet setAccount={setAccount} setContract={setContract} setSigner={setSigner} />
          {account && contract && signer && (
            <>
              <ApproveMinter contract={contract} account={account} signer={signer} /> 
              <MintAward contract={contract} account={account} signer={signer} />
              <SendAward contract={contract} account={account} signer={signer}/>
            </>
          )}
        </main>
      </div>
    </ChakraProvider>
  );
}

export default App;
