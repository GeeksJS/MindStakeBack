var express = require('express');
var router = express.Router();

const Transaction = require('../models/Transaction')
const Donation = require('../models/Donation')



//Add transaction(Buying coins) to database
router.post('/add-transaction', async (req, res) => {
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
router.post('/add-donation', async (req, res) => {

    const donation = new Donation({
        amount: req.body.amount,
        created: req.body.created,
        Sender: req.body.Sender,
        Receiver: req.body.Receiver
    })

    donation.save();
    res.end()
});


router.get('/transactions/:idUser', async (req, res) => {
    const id = req.params.idUser

    const trans = await Transaction.find({ User: id.toString() })

    res.json(trans)

});

router.get('/transactions', async (req, res) => {
    const date = req.query.created
    console.log(date)

    const trans = await Transaction.find({ created: date })

    res.json(trans)

});

router.get('/transacts', async (req, res) => {

    const trans = await Transaction.find({})

    res.json(trans)

});



router.get('/donations-user/:idUser', async (req, res) => {
    const id = req.params.idUser

    const don = await Donation.find({ Sender: id.toString() })

    res.json(don)

});

router.get('/donations-creator/:idUser', async (req, res) => {
    const id = req.params.idUser

    const don = await Donation.find({ Receiver: id.toString() })

    res.json(don)

});

router.get('/donations', async (req, res) => {


    const don = await Donation.find({})

    res.json(don)

});

module.exports = router;