# Server Signed Transactions
Server signed blockchain transactions utilizing web3.js - Ethereum JavaScript API

![Logo](https://alexandrebarros.com/global/serverside-signed.png)

## Goals

A system that sign transactions in the server side, without needing to use apps like Metamask for it.

- [X] When to server sign
- [X] Create express app
- [X] Connect to web3
- [X] Get contract object
- [X] Create transaction
- [X] Sign and send

## Problem
When to server sign:
- For automated calls to change state in blockchain
    - Enterprise system access to smart contracts
    - CRON job connection
    - Automated oracle
    - Generated payments
    - Exchange transactions
    - Avoid custodial model
- Requires server app to have access to private key
- May require message queue to handle large volumes

## Solution

Sign the transaction in the server side using web3js library.

## Tech Stack

**Client:** React

**Server:** Node, Express

## Run Locally

### Create Express app
```bash
mkdir project-folder
cd project-folder
npx express-generator
npm install
npm start
```
Check out the app in the browser
```bash
http://localhost:3000/
```

### Connect to Web3
- Run ganache
- Install npm module web3
```bash
npm install web3
```
- Add to app.js
```js
const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
web3.eth.getAccounts(console.log);
```
### Get contract object
- Need the contract address and ABI - add to app.js
```js
const contractAddress = 'YOUR_CONTRACT_ADD';
const ABI = require('YOUR_ABI_FILE');
var TestContract = web3.eth.contract([YOUR_ABI], contractAddress);
```
### Create transaction
Need the contract address, ABI, account, private key and nonce
```js
const contractAddress = 'YOUR_CONTRACT_ADD';
const ABI = require('YOUR_ABI_FILE');
const account = '0xACCOUNT_ADDRESS';
const privateKey = Buffer.from('YOUR_PRIVATE_KEY', 'hex');
const newAddress = '0x5aB5E52245Fd4974499aa625709EE1F5A81c8157';
var TestContract = new web3.eth.Contract([YOUR_ABI], contractAddress);
const _data = TestContract.methods.setOwner(_newAddress).encodeABI();
web3.eth.getTransactionCount(account)
.then(nonce => {
   var rawTx = {
      nonce: nonce,
     gasPrice: '0x20000000000',
     gasLimit: '0x27511’,
     to: contractAddress,
     value: 0,
data: _data }
```
### Sign and send
- Sign the transaction
```js
var tx = new Tx(rawTx);
     tx.sign(privateKey);
     var serializedTx = tx.serialize();
     web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
       .on('receipt', console.log);
});
```


## Author

- [@Alexandre Rapchan B. Barros](https://www.github.com/AleRapchan)


## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.

## Appendix

- Web3.js: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events
- Bootstrap 5: https://getbootstrap.com/docs/5.0/getting-started/introduction/
- Metamask: https://docs.metamask.io/guide/
- Remix: https://remix-ide.readthedocs.io/en/latest/
- React: https://reactjs.org/docs/getting-started.html
- Solidity: https://docs.soliditylang.org/en/v0.4.24/
- Ganache: https://www.trufflesuite.com/docs/ganache/overview
