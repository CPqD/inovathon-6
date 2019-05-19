'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const user = 'client_john'
const channel_name = 'mainchannel';
const smart_contract_name = 'part-contract'

async function getAllParts(operation, id, callback) {
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

        //await contract.submitTransaction('createPart', '007', 'Parabrisa', '5ce07b9c9ec001a6e8306fa7', 'none');
        //const msg = await contract.submitTransaction('readPart', '001');
        //const msg = await contract.submitTransaction('changePart', '001', '002', 'owner56');
        //await contract.submitTransaction('setParentPart', '003', '001', 'owner1');
        //const msg = await contract.submitTransaction('partHistory', '001');
        //await contract.submitTransaction('transferPart', '003', 'manufacturer1', 'owner1');
        //
        var msg = "[]";

        if(operation == 1){
            msg = await contract.submitTransaction('queryAllParts');
        }
        if(operation == 2)
            msg = await contract.submitTransaction('readPart', id);
        if(operation == 3)
            msg = await contract.submitTransaction('partHistory', id);
        if(operation == 4){
            var version = 'newton';

            var items = [
                {
                    id: '150',
                    name: 'Mustang GT',
                    owner: '5ce17df1a73aa5efc4435799',
                    description: 'O Ford Mustang é um automóvel desportivo produzido pela Ford Motor Company. O carro foi apresentado ao público em 17 de abril de 1964.',
                    image: 'https://img.olx.com.br/thumbs256x256/22/221906007621979.jpg',
                    color: 'Amarelo',
                    plate: 'HVW-8876'
                },
                {
                    id: '151',
                    name: 'Tesla Model S',
                    owner: '5ce17df1a73aa5efc4435799',
                    description: 'O Model S é um sedan esportivo elétrico produzido pela Tesla Motors e foi lançado nos Estados Unidos em junho de 2012.',
                    image: 'http://s1.1zoom.me/b5050/722/Tesla_Motors_2015_Brabus_469564_2880x1800.jpg',
                    color: 'Azul',
                    plate: 'ABC-7654'
                },
                {
                    id: '152',
                    name: 'Volkswagen UP',
                    owner: '',
                    description: 'O Volkswagen Up 2019 é uma das opções para quem deseja levar para a casa um carro de dimensões compactas, mas com motorização moderna e boa dose de equipamentos. Ele é atualmente o menor automóvel da marca alemã no Brasil.',
                    image: 'http://s2.glbimg.com/cLTt7HGaUl4FXQTPCPuAxNDmcBY=/620x413/e.glbimg.com/og/ed/f/original/2017/07/20/novo_up_pepper_8.jpg',
                    color: 'Branco',
                    plate: 'HYT-7685'
                }
            ];

            console.log(items);

            var msg1 = await contract.submitTransaction('createPart', items[0].id, items[0].name, items[0].owner, 'none', items[0].description, items[0].image, items[0].color, items[0].plate);
            var msg2 = await contract.submitTransaction('createPart', items[1].id, items[1].name, items[1].owner, 'none', items[1].description, items[1].image, items[1].color, items[1].plate);
            //var msg3 = await contract.submitTransaction('createPart', items[2].id, items[2].name, items[2].owner, 'none', items[2].description, items[2].image, items[2].color, items[2].plate);

            console.log(msg1);
            console.log(msg2);
            //console.log(msg3);
            console.log('Transaction has been submitted');
        }
        if(operation == 5){
            console.log('marcelo');
            var msg = await contract.submitTransaction('queryAllParts');

            console.log(JSON.parse(msg));
            console.log('Transaction has been submitted');
        }
        if(operation == 6){
            var items = [
                {
                    id: '250',
                    name: 'Retrovisor',
                    owner: '5ce17df1a73aa5efc4435799',
                    description: '',
                    parent: '150',
                    image: '',
                    color: 'Azul',
                    plate: ''
                },
                {
                    id: '255',
                    name: 'Disco de Freio 2019',
                    owner: '5ce17df1a73aa5efc4435799',
                    description: '',
                    parent: 'none',
                    image: '',
                    color: '',
                    plate: ''
                },
                {
                    id: '252',
                    name: 'Vela de Ignição',
                    owner: '5ce17df1a73aa5efc4435799',
                    description: '',
                    parent: '150',
                    image: '',
                    color: '',
                    plate: ''
                },
                {
                    id: '253',
                    name: 'Parabrisa',
                    owner: '5ce1632a80f553e1fda89bba',
                    description: '',
                    parent: '151',
                    image: '',
                    color: '',
                    plate: ''
                },
                {
                    id: '254',
                    name: 'Farol',
                    owner: '5ce1632a80f553e1fda89bba',
                    description: '',
                    parent: '152',
                    image: '',
                    color: '',
                    plate: ''
                }
            ];

            console.log(items);

            //var msg1 = await contract.submitTransaction('createPart', items[0].id, items[0].name, items[0].owner, items[0].parent, items[0].description, items[0].image, items[0].color, items[0].plate);
            var msg2 = await contract.submitTransaction('createPart', items[1].id, items[1].name, items[1].owner, items[1].parent, items[1].description, items[1].image, items[1].color, items[1].plate);
            //var msg3 = await contract.submitTransaction('createPart', items[2].id, items[2].name, items[2].owner, items[2].parent, items[2].description, items[2].image, items[2].color, items[2].plate);
            //var msg4 = await contract.submitTransaction('createPart', items[3].id, items[3].name, items[3].owner, items[3].parent, items[3].description, items[3].image, items[3].color, items[3].plate);
            //var msg5 = await contract.submitTransaction('createPart', items[4].id, items[4].name, items[4].owner, items[4].parent, items[4].description, items[4].image, items[4].color, items[4].plate);

            //console.log(msg1);
            console.log(msg2);
            //console.log(msg3);
            //console.log(msg4);
            //console.log(msg5);
            console.log('Transaction has been submitted');
        }else if(operation == 7){
            console.log(id);
            await contract.submitTransaction('setParentPart', id.idPart, id.idParent, id.owner);
            msg = "{}";
        }

        console.log(msg.toString('utf-8'));
        console.log('Transaction has been submitted');

        await gateway.disconnect();

        callback(JSON.parse(msg));

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function updateOwner(id, currentOwner, newOwner, callback) {
    console.log(id, currentOwner, newOwner);
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
        //await contract.submitTransaction('createPart', '006', 'filtro de ar 2', '5ce07b9c9ec001a6e8306fa7', 'none');
        //const msg = await contract.submitTransaction('readPart', '001');
        //const msg = await contract.submitTransaction('changePart', '001', '002', 'owner56');
        //await contract.submitTransaction('setParentPart', '003', '001', 'owner1');
        //const msg = await contract.submitTransaction('partHistory', '001');
        //await contract.submitTransaction('transferPart', '003', 'manufacturer1', 'owner1');
        //
        var msg = "[]";
        msg = await contract.submitTransaction('transferPart', id + "", currentOwner + "", newOwner + "");

        //console.log(msg.toString('utf-8'));
        //console.log('Transaction has been submitted');

        await gateway.disconnect();

        callback(msg);

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

exports.getAllParts = getAllParts;
exports.updateOwner = updateOwner;

//getAllParts(6, null, () => {});

