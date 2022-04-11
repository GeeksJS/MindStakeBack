var express = require('express');
var router = express.Router();
const Blockchain = require("../blockchain/blockchain")
const PubSub = require("../blockchain/pubsub")


const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain})

setTimeout(() => pubsub.broadcastChain(), 1000)

router.get('/blocks',(req,res) => {
    res.json(blockchain.chain)
})

router.post('/mine',(req,res) => {
    const {data} = req.body;
    blockchain.addBlock({data});
    res.redirect('/blockchain/blocks')
})


module.exports = router ;