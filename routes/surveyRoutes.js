const _ = require('lodash');
const Path = require('path-parser');
//rul 库是NODE的内建库
const {URL} = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Mailer = require('../services/Mailer.js');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');


//可以直接require为了方便TEST
const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/thanks',(req, res) => {
        res.send('Thanks for your feedback');
    });

    app.post('/api/surveys/webhooks',(req,res) => {
        const events = _.map(req.body, (event) => {
            const pathname = new URL(event.url).pathname;
            //建立一个检测模板
            const p = new Path('/api/surveys:surveyId/:choice');
            p.test(pathname);
        });
    });

    app.post('/api/surveys', requireLogin,requireCredits,async (req, res) => {
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


        //greate place to send an email!
        //surveyTemplate作用是把前端传入的数据渲染成HTML格式
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            //用户余额也要减少
            req.user.credits -= 1;
            const user = await req.user.save();


            res.send(user);
        } catch(err){
            res.status(422).send(err);
        }
    });
};
