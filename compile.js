const path = require('path');
const fs = require('fs');

// import solidity compiler
const solc = require('solc');

// path to contracts
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// compile contracts
module.exports = solc.compile(source, 1).contracts[':Inbox'];
