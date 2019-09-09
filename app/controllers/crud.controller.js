const  DB = require('../models/db.model.js');

// Creating an object
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Object content can not be empty"
        });
    }

    // Create an object
    const rec = new DB({
        // Insert Details of Object
    });

    // Save object in the database
    rec.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the object."
        });
    });
};

// Retrieval from database
exports.findAll = (req, res) => {
    DB.find()
    .then(recs => {
        res.send(recs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving records."
        });
    });
};

// Finding a single object
exports.findOne = (req, res) => {
    DB.findById(req.params.recId)
    .then(rec => {
        if(!rec) {
            return res.status(404).send({
                message: "Record not found with id " + req.params.recId
            });            
        }
        res.send(rec);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Record not found with id " + req.params.recId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving object with id " + req.params.recId
        });
    });
};


// Updating an object
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Object content can not be empty"
        });
    }

    // Find object and update it with the request body
    DB.findByIdAndUpdate(req.params.recId, {
        // Changes
    }, {new: true})
    .then(rec => {
        if(!rec) {
            return res.status(404).send({
                message: "Object not found with id " + req.params.recId
            });
        }
        res.send(rec);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Object not found with id " + req.params.recId
            });                
        }
        return res.status(500).send({
            message: "Error updating object with id " + req.params.recId
        });
    });
};

// Deleting an object
exports.delete = (req, res) => {
    DB.findByIdAndRemove(req.params.recId)
    .then(rec => {
        if(!rec) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.recId
            });
        }
        res.send({message: "Object deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Object not found with id " + req.params.recId
            });                
        }
        return res.status(500).send({
            message: "Could not delete object with id " + req.params.recId
        });
    });
};

// Accepting URI from app
exports.uri = function (req, res) {
    var post=req.body;
    console.log("Received uri : "+ post);
    res.send("Sending some message");
};

// Accepting data from app
exports.data = function (req, res) {
    var post=req.body;
    console.log("Received data : "+ post);
    res.send("Sending some message");
};