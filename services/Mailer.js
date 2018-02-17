const sendgrid = require('sendgrid');
//helper帮助我们建立email
const helper = sendgrid.mail;
const keys = require('../config/keys.js');

//我们想要在Mailer里做些修改并继承helper.Mail里的方法
class Mailer extends helper.Mail{
    constructor({subject, recipients},content){
        //es2015的规定
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        //让想让回复邮件的人知道邮件是不可回复的~
        this.from_email = new helper.Email('no-reply@email.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        //接收邮件的人
        this.recipients = this.formatAddresses(recipients);

        //调用helper内置函数addContent写到邮件里
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();

    }


    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    formatAddresses(recipients) {
        return recipients.map(({email}) => {
            //对email进行格式化
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);
        trackingSettings.setClickTracking(clickTracking);
        this.addClickTrackingSettings(trackingSettings);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        //调用sgApi下的函数API发送给sendgrid！
       const response =  this.sgApi.API(request);
        return response;
    }


};
//在创建实例的时候我们用new Mailer()，这个函数执行的第一步是constructor()来进行一系列的初始化。
//exports 可以Import，
module.exports = Mailer;
