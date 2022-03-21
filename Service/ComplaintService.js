const Complaint = require('../models/Complaint')
/* functio to add complaint*/


function addComplaint(req) {
  var newcomplaint = new Complaint({
    Description: req.Description,
    Title: req.Title,
    User: req.User
  });
  newcomplaint.save();

}
/* Function to display one complaint*/
async function displayComplaintById(id) {
  return await Complaint.find({ _id: id.toString() })
    .then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));
}

/*Function Update */
function updateComplaint(req, id) {
  Complaint.findByIdAndUpdate({ _id: id.toString() }, {
    Description: req.Description,
    Title: req.Title,
    Treated: req.Treated,
  },
    (err) => {
      if (err) throw err;
    });

}
/* Function to Delete one complaint*/
function deleteComplaintById(id) {
  Complaint.findOneAndRemove({ _id: id.toString() }, (err) => {
    if (err) throw err;
  })
}

/* Function to Display All complaint*/
async function displayAllComplaint() {
  return await Complaint.find()
    .then(data => data) /* mongoose find methode always return promise  */
    .catch(err => console.log(err));
}


/************Achref *************/

//Approve project
async function treatComplaint (data, idComplaint) {
  await Complaint.findByIdAndUpdate({ _id: idComplaint.toString() }, data)
  .then(data=>data)
}
module.exports = { addComplaint, displayComplaintById, updateComplaint, deleteComplaintById, displayAllComplaint,treatComplaint } 
