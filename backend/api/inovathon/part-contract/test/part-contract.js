/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PartContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('PartContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PartContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"part 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"part 1002 value"}'));
    });

    describe('#partExists', () => {

        it('should return true for a part', async () => {
            await contract.partExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a part that does not exist', async () => {
            await contract.partExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPart', () => {

        it('should create a part', async () => {
            await contract.createPart(ctx, '1003', 'part 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"part 1003 value"}'));
        });

        it('should throw an error for a part that already exists', async () => {
            await contract.createPart(ctx, '1001', 'myvalue').should.be.rejectedWith(/The part 1001 already exists/);
        });

    });

    describe('#readPart', () => {

        it('should return a part', async () => {
            await contract.readPart(ctx, '1001').should.eventually.deep.equal({ value: 'part 1001 value' });
        });

        it('should throw an error for a part that does not exist', async () => {
            await contract.readPart(ctx, '1003').should.be.rejectedWith(/The part 1003 does not exist/);
        });

    });

    describe('#updatePart', () => {

        it('should update a part', async () => {
            await contract.updatePart(ctx, '1001', 'part 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"part 1001 new value"}'));
        });

        it('should throw an error for a part that does not exist', async () => {
            await contract.updatePart(ctx, '1003', 'part 1003 new value').should.be.rejectedWith(/The part 1003 does not exist/);
        });

    });

    describe('#deletePart', () => {

        it('should delete a part', async () => {
            await contract.deletePart(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a part that does not exist', async () => {
            await contract.deletePart(ctx, '1003').should.be.rejectedWith(/The part 1003 does not exist/);
        });

    });

});