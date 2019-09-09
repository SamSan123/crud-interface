const mongoose = require('mongoose');

const DBSchema = mongoose.Schema({
    //
}, {
    timestamps: true
});

module.exports = mongoose.model('DB', DBSchema);
