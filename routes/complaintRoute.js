var express = require('express');
const checkAuth = require('../middleware/check-auth');
var router = express.Router();
var ComplaintService = require('../Service/ComplaintService');

/*begin Simple Crud Complaint*/

router.use(checkAuth)

/* AddSimpleComplaint */
router.post('/addComplaint', function (req, res, next) {
  ComplaintService.addComplaint(req.body);
  res.end()
});

/************Achref *************/
 
//Approve project
router.put('/treatcomplaint/:id', function (req, res, next) {
  ComplaintService.treatComplaint(req.body,req.params.id);
  res.end()
});


/*find Complaint By Id*/
router.get('/:id', function (req, res, next) {
   ComplaintService.displayComplaintById(req.params.id).then(data => res.json(data));
});

/*Update Complaint By Id*/
router.post('/update/:id', function (req, res, next) {
  var id = req.params.id;
  ComplaintService.updateComplaint(req.body,req.params.id);

});

/*Delete Complaint By Id*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  ComplaintService.deleteComplaintById(id);
});

/* find All Complaints*/
router.get('/', function (req, res, next) {
  ComplaintService.displayAllComplaint().then(data => res.json(data));;
});
module.exports = router;