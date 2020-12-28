const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = {
    user_name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
};

const UserSchema = new Schema(user);

module.exports = mongoose.model('users', UserSchema);