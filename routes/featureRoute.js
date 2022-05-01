var express = require('express');
var router = express.Router();
const Feature = require('../models/Feature')
var PackService = require('../Service/PackService');
const checkAuth = require('../middleware/check-auth');


router.use(checkAuth)

/* AddSimplePack */
router.post('/addFeature', function (req, res, next) {

    var newfeature = new Feature({
        Description: req.body.Description
    })
    newfeature.save()

    res.end()

});

router.get('/getDescById', function (req, res, next) {
 
    Feature.find().then(data=>res.json(data))
 
});



router.post('/getFeatureDesc', function (req, res, next) {
    //console.log(req.body.list)
    // if (req.body.list.length === 0) {
    //     return res.json([])
    // }
    // const listFeatures = req.body.list
    // var listFeaturesDesc = []

    // listFeatures.map(element => {
    //    // console.log(element)
    //     Feature.findById({ _id: element })
    //         .then(data => {
    //             //console.log(data.Description)
    //             listFeaturesDesc.push(data.Description)       
                
    //         })
    //         .catch(err => console.error(err))
    // })
    // res.json(listFeaturesDesc)
    
    PackService.features(req).then(data => res.json(data));
  //  res.end()
    
//res.end()
});

router.get('/all', function (req, res, next) {
 
    Feature.find().then(data=>res.json(data))
 
});

router.delete('/delete/:description', function (req, res, next) {
 
    PackService.deleteFeatureById(req.params.description)
    res.end()
 
});






module.exports = router;
