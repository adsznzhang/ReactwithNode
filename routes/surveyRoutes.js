const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');

//可以直接require为了方便TEST
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin,requireCredits,(req, res) => {
        //前端负责把这些数据传递过来！
        const {title, subject, body, recipients} =  req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            //{} 会让解释器不清除是函数体还是对象的{} 所以要在外面加一个()
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent:Date.now()
        });
    });
};
