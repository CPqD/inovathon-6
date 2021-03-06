 'use strict';

 const { FileSystemWallet, Gateway } = require('fabric-network');
 const fs = require('fs');
 const path = require('path');

 const user = 'client_john'
 const channel_name = 'mainchannel';
 const smart_contract_name = 'part-contract'

 async function main() {
   try {

     // Parse the connection profile. This would be the path to the file downloaded
     // from the IBM Blockchain Platform operational console.
     const ccpPath = path.resolve(__dirname, 'connection.json');
     const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

     // Configure a wallet. This wallet must already be primed with an identity that
     // the application can use to interact with the peer node.
     const walletPath = path.resolve(__dirname, 'wallet');
     const wallet = new FileSystemWallet(walletPath);

     // Create a new gateway, and connect to the gateway peer node(s). The identity
     // specified must already exist in the specified wallet.
     const gateway = new Gateway();
     await gateway.connect(ccp, { wallet, identity: user, discovery: {enabled: true, asLocalhost:false }});

     // Get the network channel that the smart contract is deployed to.
     const network = await gateway.getNetwork(channel_name);

     // Get the smart contract from the network channel.
     const contract = network.getContract(smart_contract_name);

     // Submit transaction
     //await contract.submitTransaction('createPart', '003', 'filtro de ar', 'manufacturer1', 'none');
     //const msg = await contract.submitTransaction('readPart', '001');
     //const msg = await contract.submitTransaction('changePart', '001', '002', 'owner56');
     //await contract.submitTransaction('setParentPart', '003', '001', 'owner1');
     //const msg = await contract.submitTransaction('partHistory', '001');
     //await contract.submitTransaction('transferPart', '003', 'manufacturer1', 'owner1');

     const msg = await contract.submitTransaction('queryAllParts');

     console.log(msg.toString('utf-8'));
     console.log('Transaction has been submitted');

     await gateway.disconnect();

     } catch (error) {
       console.error(`Failed to submit transaction: ${error}`);
       process.exit(1);
     }
   }
 main();

