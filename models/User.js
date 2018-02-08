const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
//Schema对象在建立的时候要么直接传递类型或者传递一个带类型的对象
    googleId: String,
    credits: {type: Number, default: 0}
});

mongoose.model('users', userSchema);


