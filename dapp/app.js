// Web3 Interaction
const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;

const URL = "HTTP://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(URL));

const account = "0x799B640e42786EC96b5BB02fDbE0C22edc9Ca7dA";
const YOUR_PRIVATE_KEY_1 =
  "8f4d5dcb36f3c69b6a08d0f6dc27665dcfc4d7e6c44be5cd0332aa26dacf9f2f";
const privateKey = Buffer.from(YOUR_PRIVATE_KEY_1, "hex");
const newAddress = "0xCCdFa837722e6F328e35180be609f56aa81974b1";

const contractAddress = "0x295bDd9542fD804323D5AA224E8031f5F5698770";
const ABI = require("ABI.json");

var MyContract = new web3.eth.Contract(ABI, contractAddress, {
  from: account,
});

const _data = MyContract.methods.setOwner(newAddress).encodeABI();

web3.eth.getTransactionCount(account).then((nonce) => {
  var rawTx = {
    nonce: nonce,
    gasPrice: "0x20000000000",
    gasLimit: "0x27511",
    to: contractAddress,
    value: 0,
    data: _data,
  };

  // Sign and send
  var tx = new Tx(rawTx);
  tx.sign(privateKey);
  var serializedTx = tx.serialize();
  // Broadcast the transaction
  web3.eth
    .sendSignedTransaction("0x" + serializedTx.toString("hex"))
    .on("receipt", console.log);
  // Check Ganache or Etherscan to see the transaction!
});
