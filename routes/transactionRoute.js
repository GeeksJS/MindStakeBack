var express = require('express');
var router = express.Router();

const Transaction = require('../models/Transaction')
const Donation = require('../models/Donation')



//Add transaction(Buying coins) to database
router.post('/add-transaction', async (req,res)=>{
    const transaction = new Transaction({
        amount: req.body.amount,
        created: req.body.created,
        currency: req.body.currency,
        status: req.body.status,
        User: req.body.User
    })

    transaction.save();
    res.end()
});

 //Add transaction(Donation) to database
router.post('/add-donation', async (req,res)=>{
    
    const donation = new Donation({
        amount: req.body.amount,
        created: req.body.created,
        Sender: req.body.Sender,
        Receiver: req.body.Receiver
    })

    donation.save();
    res.end()
});

module.exports = router;