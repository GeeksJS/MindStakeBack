var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Companies = require('../models/Companies');

router.use(checkAuth)

router.get('/banks',  function (req, res, next) {
    Companies.find({})
    .then(companies => res.json(companies))
    .catch(err => res.status(404).json({ notfound: 'No companies found' }));
});

module.exports = router;
