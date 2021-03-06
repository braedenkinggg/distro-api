const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistroSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    currentVersion: {
        type: String,
        required: true
    },
    basedOn: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    }
});

const Distro = mongoose.model("Distro", DistroSchema);

module.exports = Distro;