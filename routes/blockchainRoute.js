var express = require('express');
var router = express.Router();
const Blockchain = require("../blockchain/blockchain")
const PubSub = require("../blockchain/pubsub")
const TransactionPool = require('../wallet/transaction-pool')
const Wallet = require('../wallet/index')
const TransactionMiner = require('../Mining/Transaction-miner')
const Wallet1 = require('../models/Wallet')
const { ec } = require('../util/index')


const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();

const pubsub = new PubSub({ blockchain, transactionPool })
const transactionMiner = new TransactionMiner({ blockchain, transactionPool, wallet, pubsub });

const stripe = require('stripe')('sk_test_51KbolmBs4Ihz8GXR4oEBHVYeGc6tO9iY1uyIkeFzxYDeVYJWyHsfwvxeDa7I20AKBRHUXEUQMWwjeuCohyANgGFA00YZeXTPZV');



router.get('/blocks', (req, res) => {
    res.json(blockchain.chain)
})

router.post('/mine', (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain()
    res.redirect('/blockchain/blocks')
})

router.post('/transact', async (req, res) => {
    const { amount, recipient, senderWalletAddress } = req.body;

    const senderWallet = await Wallet1.findOne({ publicKey: senderWalletAddress.toString() })
    console.log(senderWallet.balance)
    //let keyPair;

    //senderWallet = {...senderWallet,[keyPair]:ec.genKeyPair()}

    let transaction = transactionPool.existingTransaction({ inputAddress: senderWallet.publicKey })
    try {
        if (transaction) {
            transaction.update({ senderWallet: senderWallet, recipient, amount })
        } else {
            transaction = wallet.createTransaction({ senderWallet, recipient, amount, chain: blockchain.chain })
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

router.post('/create-wallet/:userId', async (req, res) => {
    const id = req.params.userId;

    const existingWallet = await Wallet1.findOne({ User: id.toString() })
    console.log(existingWallet)
    if (existingWallet) {
        res.send('Wallet already exists')
        return
    }

    const wallet = new Wallet();

    const wallet1 = new Wallet1({
        balance: wallet.balance,
        publicKey: wallet.publicKey,
        User: id
    });
    console.log(wallet1)

    wallet1.save()

    res.end()

});

router.put('/update-wallet/:userId', async (req, res) => {
    const id = req.params.userId;
    let newBalance; 
    const qte = req.body.coins
    console.log(qte)

    const existingWallet = await Wallet1.findOne({ User: id.toString() })

    console.log(existingWallet.balance)

    newBalance = existingWallet.balance+qte  

    console.log(newBalance)
    existingWallet.balance =  newBalance  

    existingWallet.save()

    res.end()  

});

router.put('/update-wallet-minus/:userId', async (req, res) => {
    const id = req.params.userId;
    let newBalance; 
    const qte = req.body.coins

    const existingWallet = await Wallet1.findOne({ User: id.toString() })

    newBalance = existingWallet.balance-qte  
    existingWallet.balance =  newBalance  

    existingWallet.save()
 
    res.end()

});

router.get('/wallet/:userId', async (req, res) => {
    const id = req.params.userId;


    const wallet = await Wallet1.findOne({ User: id.toString() })

    const address = wallet.publicKey;

    res.json({
        address,
        balance: wallet.balance,
        User: wallet.User
    })


});

router.get('/payment', async (req, res) => {
    const paymentIntents = await stripe.paymentIntents.list({
        limit: 1,
    });
    res.json(paymentIntents)
});

module.exports = router;