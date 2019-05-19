/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class VehicleContract extends Contract {

    async vehicleExists(ctx, vehicleId) {
        const buffer = await ctx.stub.getState(vehicleId);
        return (!!buffer && buffer.length > 0);
    }

    async createVehicle(ctx, vehicleId, value, vehicle_type) {
        const exists = await this.vehicleExists(ctx, vehicleId);
        if (exists) {
            throw new Error(`The vehicle ${vehicleId} already exists`);
        }
        const asset = { value, vehicle_type};
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(vehicleId, buffer);
    }

    async readVehicle(ctx, vehicleId) {
        const exists = await this.vehicleExists(ctx, vehicleId);
        if (!exists) {
            throw new Error(`The vehicle ${vehicleId} does not exist`);
        }
        const buffer = await ctx.stub.getState(vehicleId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateVehicle(ctx, vehicleId, newValue) {
        const exists = await this.vehicleExists(ctx, vehicleId);
        if (!exists) {
            throw new Error(`The vehicle ${vehicleId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(vehicleId, buffer);
    }

    async deleteVehicle(ctx, vehicleId) {
        const exists = await this.vehicleExists(ctx, vehicleId);
        if (!exists) {
            throw new Error(`The vehicle ${vehicleId} does not exist`);
        }
        await ctx.stub.deleteState(vehicleId);
    }

}

module.exports = VehicleContract;
