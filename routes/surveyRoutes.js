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

  app.get('/api/surveys',requireLogin, async (req, res) => {
      // 不需要把survey下的 recipients对象也拉出来
      const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice',(req, res) => {
    res.send('Thanks for your feedback');
  });

  app.post('/api/surveys/webhooks',(req,res) => {
    //建立一个检测模板
    const p = new Path('/api/surveys:surveyId/:choice');
    //我们只想获取对象里面的email和url,({email,url})
    // const events = _.map(req.body, (event) => {
    //     const pathname = new URL(event.url).pathname;
    //     const match = p.test(pathname);
    //     if(match){
    //         return {email:event.email, surveyId:match.surveyId, choice:match.email};
    //     }
    // });

    //移除数组中的undifined；
    // const compactEvents = _.compact(events);
    // //只收集用户点击一次
    // const uniqueEvents = _.uniqBy(compactEvents, 'email','surveyId');
    //lodash 里有advanced chain
    _.chain(req.body)
     .map(({email,url}) => {
       const match = p.test(new URL(url),pathname);
       if(match){
         return {email, surveyId:match.surveyId, choice:match.choice};
       }
     })
     .compact()
     .uniqBy('email','surveyId')
    //我们只关心surveyId, email,choice
     .each(({surveyId, email,choice})=> {
       Survey.updateOne({
         //mongo里面的id带下划线
         _id: surveyId,
         recipients: {
           $elemMatch:{email:email,responded:false}
         }
       },{
         $inc: {[choice]:1},
         $set: {'recipients.$.responded':true},
         lastResponded: new Date()
         //执行
       }).exec();
     })
     .value();


    res.send({});
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
