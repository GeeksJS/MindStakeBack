var express = require('express');
var router = express.Router();
const Proposal = require('../models/Proposal');
const Conversation = require("../models/Conversation");

//crud proposal
router.get('/', (req, res) => {
    Proposal.find()
        .then(proposals => res.json(proposals))
        .catch(err => res.status(404).json({ notfound: 'No proposals found' }));
}
);
router.post('/', (req, res) => {
    const newProposal = new Proposal(
        req.body);
    newProposal.save() 
        .then(proposal => res.json(proposal))
        .catch(err => res.status(400).json({ error: err }));
}
);
router.get('/:id', (req, res) => { 
    Proposal.findById(req.params.id)
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}   
);
router.get('/owner/:id', (req, res) => { 
    Proposal.find({ownerId: req.params.id})
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}   
);
router.put('/accepte/:id',  (req, res) => {
    Proposal.findByIdAndUpdate(req.params.id, {state:"Approved"})
        .then(proposal => {res.json(proposal);
            let newConversation = new Conversation({
                members: [proposal.investorId,proposal.ownerId],
            });
        
            try {
                const savedConversation =  newConversation.save();
               
            } catch (err) {
               console.log(err)
            }})
        .catch(err => res.status(404).json({ notfound: 'No proposal found' })); 
}   //update proposal
);
router.put('/reject/:id', (req, res) => {
    Proposal.findByIdAndUpdate(req.params.id, {state:"Rejected"})
        .then(proposal => res.json(proposal))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' })); 
}   //update proposal
);
router.delete('/:id', (req, res) => {   //delete proposal
    Proposal.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ notfound: 'No proposal found' }));
}
);
module.exports = router;
