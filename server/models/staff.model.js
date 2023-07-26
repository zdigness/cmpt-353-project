const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
