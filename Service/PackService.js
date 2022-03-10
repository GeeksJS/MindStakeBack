const Pack = require('../models/Pack')
/* functio to add Pack*/
function addPack(req) {
    console.log(req);
    var newpack = new Pack({
        Description:req.Description,
        Level:req.Level,
        Price:req.Price,
        Title: req.Title,
        Duration:req.Duration,
        Available:req.Available
    });
    newpack.save();

}
/* Function to display one Pack*/
async function displayPackById(id) {
    return await Pack.find({ _id: id.toString() })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}

/*Function Update */
function updatePack(req, id) {
    Pack.findByIdAndUpdate({ _id: id.toString() }, {
        Description:req.Description,
        Level:req.Level,
        Price:req.Price,
        Title: req.Title,
        Duration:req.Duration,
        Available:req.Available
    },
        (err) => {
            if (err) throw err;
        });

}
/* Function to Delete one Pack*/
function deletePackById(id) {
    Pack.findOneAndRemove({ _id: id.toString() }, (err) => {
        if (err) throw err;
    })
}

/* Function to Display All Pack*/
async function displayAllPack() {
    return await Pack.find()
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}
module.exports = { addPack, displayPackById, updatePack, deletePackById, displayAllPack } 
