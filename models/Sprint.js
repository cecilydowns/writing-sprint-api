const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sprintSchema = new mongoose.Schema({
    length: Number,
    words: Number,
    date: {
        type: Date,
        default: Date.now
        }
    })

    // need to add project and user associations

module.exports = mongoose.model('Sprint', sprintSchema)