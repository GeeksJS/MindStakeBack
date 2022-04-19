var express = require('express');
var router = express.Router();
const Blockchain = require("../blockchain/blockchain")
const PubSub = require("../blockchain/pubsub")
const TransactionPool = require('../wallet/transaction-pool')
const Wallet = require('../wallet/index')
const TransactionMiner = require('../Mining/Transaction-miner')


const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubsub = new PubSub({ blockchain, transactionPool })
const transactionMiner = new TransactionMiner({ blockchain, transactionPool, wallet, pubsub });


router.get('/blocks', (req, res) => {
    res.json(blockchain.chain)
})

router.post('/mine', (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain()
    res.redirect('/blockchain/blocks')
})

router.post('/transact', (req, res) => {
    const { amount, recipient } = req.body;

    let transaction = transactionPool.existingTransaction({ inputAddress: wallet.publicKey })
    try {
        if (transaction) {
            transaction.update({ senderWallet: wallet, recipient, amount })
        } else {
            transaction = wallet.createTransaction({ recipient, amount, chain: blockchain.chain })
        }
    } catch (error) {
        return res.status(400).json({ type: 'error', message: error.message })
    }

    transactionPool.setTransaction(transaction)

    // console.log('transactionPool ', transactionPool)

    pubsub.broadcastTransaction(transaction)

    res.json({ type: 'success', transaction })
})

router.get('/transaction-pool-map', (req, res) => {
    res.json(transactionPool.transactionMap)
})


router.get('/mine-transactions', (req, res) => {
    transactionMiner.mineTransactions();

    //console.log('test')
    res.redirect('/blockchain/blocks');
});

router.get('/wallet-info', (req, res) => {
    const address = wallet.publicKey;

    res.json({
        address,
        balance: Wallet.calculateBalance({ chain: blockchain.chain, address })
    });
});

module.exports = router;