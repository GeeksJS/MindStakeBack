var express = require('express');
var router = express.Router();
var PackService = require('../Service/PackService');

/*begin Simple Crud Pack*/

/* AddSimplePack */
router.post('/addPack', function (req, res, next) {
  PackService.addPack(req.body);
  res.end()
});

/*find Pack By Id*/
router.get('/:id', function (req, res, next) {
   PackService.displayPackById(req.params.id).then(data => res.json(data));
});

/*Update Pack By Id*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  PackService.updatePack(req.body,req.params.id);
  res.end()
});  

/*Delete Pack By Id*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  PackService.deletePackById(id);
  res.end()

});

/* find All Packs*/
router.get('/', function (req, res, next) {
  PackService.displayAllPack().then(data => res.json(data));
});
module.exports = router;  