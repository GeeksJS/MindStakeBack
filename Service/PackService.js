const Feature = require('../models/Feature');
const Pack = require('../models/Pack')
/* functio to add Pack*/
function addPack(req) {
    console.log(req);
    var newpack = new Pack({
        Description: req.Description,
        Level: req.Level,
        Price: req.Price,
        Title: req.Title,
        Duration: req.Duration,
        Available: req.Available,
        Features: req.Features
    });

    // if (req.Features) {
    //     newpack.Features = Array.isArray(req.Features) ? req.Features : [req.Features]; 
    // }

    newpack.save();

}
/* Function to display one Pack*/
async function displayPackById(id) {
    return await Pack.find({ _id: id.toString() })
        .then(data => data) /* mongoose find methode always return promise  */
        .catch(err => console.log(err));
}

/*Function Update */
async function updatePack(data, id) {
    await Pack.findByIdAndUpdate({ _id: id.toString() }, data)
        .then(data => data)

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




async function features(req, res) {


    return await Feature.find({'_id': { $in: req.body.Features } }, { _id: 0, Description: 1 }).distinct("Description")
    .then(data =>  data)


}

function deleteFeatureById(desc) {
    Feature.findOneAndRemove({ Description: desc }, (err) => {
        if (err) throw err;
    })
}
module.exports = { addPack, displayPackById, updatePack, deletePackById, displayAllPack, features,deleteFeatureById } 
