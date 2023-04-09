import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
  const library = new Web3Provider(provider, {
    name: 'goerli',
    chainId: 5,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  });
  library.pollingInterval = 12000;
  return library;
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
);
