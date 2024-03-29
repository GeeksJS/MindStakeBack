const { v1: uuid } = require("uuid");
const { verifySignature } = require('../util/index')
const { REWARD_INPUT, MINING_REWARD } = require('../blockchain/config');


class Transaction {
    constructor({ senderWallet, recipient, amount, outputMap, input }) {
        this.id = uuid();
        this.outputMap = outputMap || this.createOutputMap({ senderWallet, recipient, amount })
        this.input = input || this.createInput({ senderWallet, outputMap: this.outputMap })
    }

    createOutputMap({ senderWallet, recipient, amount }) {
        const outputMap = {}
        outputMap[recipient] = amount
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount

        return outputMap
    }

    createInput({ senderWallet, outputMap }) {
        return {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey
        }
    }

    update({ senderWallet, recipient, amount }) {

        if (amount > this.outputMap[senderWallet.publicKey]) {
            throw new Error('Amount exceeds balance');
        }

        if (!this.outputMap[recipient]) {
            this.outputMap[recipient] = amount;
        } else {
            this.outputMap[recipient] = this.outputMap[recipient] + amount;
        }

        this.outputMap[senderWallet.publicKey] =
            this.outputMap[senderWallet.publicKey] - amount;

        this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
    }

    static validTransaction(transaction) {
        const { input: { address, amount, signature }, outputMap } = transaction

        const outputTotal = Object.values(outputMap)
            .reduce((total, outputAmount) => total + outputAmount)

        if (amount !== outputTotal) {
            console.error(`Invalid transaction from ${address}`)
            return false
        }
        // if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
        //     console.error(`Invalid signature from ${address}`)
        //     return false
        // }

        return true
    }

    static rewardTransaction({ minerWallet }) {
        return new this({
            input: REWARD_INPUT,
            outputMap: { "044b2bae1bb11aef295db332b35ffbc36bfb3a7c375eda12d3fd15b1fb15f945c24a1b691301fb6d6b3e655ca87a691159d7f075fddddaf590f1ce0cfbf6554d13": MINING_REWARD }
        });
    }

}

module.exports = Transaction