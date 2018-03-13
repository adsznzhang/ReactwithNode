email = "a@a.com"
choice = 'yes' || 'no';

Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch:{email: email, responded:false}
    }
}, {
  //no的数量增加1
  $inc: {[choice]:1},
  $set: {'recipients.$.responded': true}
});
