/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PartContract extends Contract {

    async partExists(ctx, partId) {
        const buffer = await ctx.stub.getState(partId);
        return (!!buffer && buffer.length > 0);
    }

    async createPart(ctx, partId, partName, ownerId, parentPartId, description, image, color, plate) {
        const exists = await this.partExists(ctx, partId);
        if (exists) {
            throw new Error(`The part ${partId} already exists`);
        }
        const asset = { partId, partName, ownerId, parentPartId, timestamp: new Date(), description, image, color, plate };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(partId, buffer);
    }

    async changePart(ctx, partId, newPartId, currentOwner){
        var partState = JSON.parse(await ctx.stub.getState(partId));
        var newPartState = JSON.parse(await ctx.stub.getState(newPartId));

        if(partState.ownerId !== currentOwner){
            throw new Error('Part ' + partId + ' is not owned by ' + currentOwner);
        }
        if(newPartState.ownerId !== currentOwner){
            throw new Error('Part ' + newPartId + ' is not owned by ' + currentOwner);
        }

        newPartState.parentPartId = partState.parentPartId;
        partState.parentPartId = 'none';
        
        const partBuffer = Buffer.from(JSON.stringify(partState));
        await ctx.stub.putState(partId, partBuffer);
        const newPartBuffer = Buffer.from(JSON.stringify(newPartState));
        await ctx.stub.putState(newPartId, newPartBuffer);
    }

    async transferPart(ctx, partId, currentOwner, newOwnerId){
        var partState = JSON.parse(await ctx.stub.getState(partId));

        if(partState.ownerId !== currentOwner){
            throw new Error('Part ' + partId + ' is not owned by ' + currentOwner);
        }
        partState.ownerId = newOwnerId;
        const buffer = Buffer.from(JSON.stringify(partState));
        await ctx.stub.putState(partId, buffer);
    }

    async setParentPart(ctx, partId, parentPartId, currentOwner){
        var partState = JSON.parse(await ctx.stub.getState(partId));

        if(partState.ownerId !== currentOwner){
            throw new Error('Part ' + partId + ' is not owned by ' + currentOwner);
        }

        partState.parentPartId = parentPartId;
        
        const partBuffer = Buffer.from(JSON.stringify(partState));
        await ctx.stub.putState(partId, partBuffer);
    }

    async readPart(ctx, partId) {
        const exists = await this.partExists(ctx, partId);
        if (!exists) {
            throw new Error(`The part ${partId} does not exist`);
        }
        const buffer = await ctx.stub.getState(partId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async partHistory(ctx, partId) {
        const exists = await this.partExists(ctx, partId);
        if (!exists) {
            throw new Error(`The part ${partId} does not exist`);
        }
        const iterator = await ctx.stub.getHistoryForKey(partId);

        let result = []
        while (true) {
            let res = await iterator.next();
            if (res.value) {
                const obj = JSON.parse(res.value.value.toString('utf8'));
                result.push(obj);
            }
            if(res.done)break;
        }
        await iterator.close();

        const asset = JSON.stringify(result);
        return asset;
    }

    async queryAllParts(ctx) {
        const startKey = "000";
        const endKey = "999";
    
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
    
        const allResults = [];
        while (true) {
          const res = await iterator.next();
    
          if (res.value && res.value.value.toString()) {
            console.log(res.value.value.toString("utf8"));
            
            const Key = res.value.key;
            let Record;
            try {
              Record = JSON.parse(res.value.value.toString("utf8"));
            } catch (err) {
              console.log(err);
              Record = res.value.value.toString("utf8");
            }
            allResults.push({ Key, Record });
          }
          if (res.done) {
            console.log("end of data");
            await iterator.close();
            console.info(allResults);
            return JSON.stringify(allResults);
          }
        }
      }

    async deletePart(ctx, partId, currentOwner) {
        const exists = await this.partExists(ctx, partId);
        if (!exists) {
            throw new Error(`The part ${partId} does not exist`);
        }
        var partState = JSON.parse(await ctx.stub.getState(partId));

        if(partState.ownerId !== currentOwner){
            throw new Error('Part ' + partId + ' is not owned by ' + currentOwner);
        }
        await ctx.stub.deleteState(partId);
    }

}

module.exports = PartContract;
