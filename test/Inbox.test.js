const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// retrieve compiled contract abi and bytecode
const { interface, bytecode } = require('..//compile');

// connect instance of web3 to local ganache test network
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all unlocked accounts
  accounts = await web3.eth.getAccounts();
  // use one account to create and deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // create contract w/ bytecode + args
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    // send transaction w/ contract
    .send({ from: accounts[0], gas: '1000000' });

  // web3 version fix - assigns provider to inbox contract
  inbox.setProvider(provider)  ;
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // assert.ok method used to verify if address is true
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    // assert.ok();
  });
});
