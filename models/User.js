const mongoose = require('mongoose');
const {Schema} = mogoose;

const userSchema = new Schema({

    googleId: String
});

mongoose.model('users', userSchema);


