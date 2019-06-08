import React from 'react';
import {
  Bitski,
  AuthenticationStatus,
} from 'bitski';
import Web3 from 'web3';

function App() {
  const clientId = '6082902f-47ba-4237-a3f9-5339dab2ec15';
  const bitski = new Bitski(clientId, 'http://localhost:3000/callback.html');
  const provider = bitski.getProvider({
    networkName: 'rinkeby',
  });
  const web3 = new Web3(provider);

  async function initBitski() {
    const network = await web3.eth.getBlockNumber();
    console.log(network);
    await bitski.signIn();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  }

  function signOut() {
    bitski.signOut()
      .then(() => {
        console.log('Signed out!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Hello!</h1>
      {bitski.authStatus === AuthenticationStatus.NotConnected ? (
        <button type="button" onClick={initBitski}>
          Sign In
        </button>
      ) : (
        <div>
          <p>You are connected!</p>
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
