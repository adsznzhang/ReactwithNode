const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient.js');


const surveySchema = new Schema({
    title: String,
    body:String,
    subject: String,
    //创建Mongodb的子文件
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    //每一个Schema存储到数据库都会有一个唯一的ObjectID，然后这个Schema的名字是User
    _user: {type: Schema.Type.ObjectID, ref: 'User'},
    dateSent: Date,
    //调查发送的时间和最后一次接受到回应的时间
    lastResponded: Date
});


mongoose.model('surveys', surveySchema);
