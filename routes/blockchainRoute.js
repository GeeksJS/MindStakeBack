var express = require('express');
var router = express.Router();
const Blockchain = require("../blockchain/blockchain")
const PubSub = require("../blockchain/pubsub")


const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain})


router.get('/blocks',(req,res) => {
    res.json(blockchain.chain)
})

router.post('/mine',(req,res) => {
    const {data} = req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain()
    res.redirect('/blockchain/blocks')
})


module.exports = router ;