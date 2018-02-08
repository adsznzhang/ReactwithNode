const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js');


module.exports = app => {
    //app.post可以传递任意多的参数，参数的顺序不计
    app.post('/api/stripe',requireLogin, async (req, res) => {
        //下面的检测代码用一个requireLoin的中间程序代替了，并且确保这个中间程序只在这一个路由里使用！
        // if(!req.user) {
        //     return res.status(401).send({error: 'You must log in!'});
        // }


        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description:'$5 for 5 credits',
            source: req.body.id
        });
        //passport帮我们对user初始化在index.js文件里
        req.user.credits += 5;
        // user 和req.user是一个对象，但user保存的总是最新的，如果直接使用req.user可能会读取旧数据。
        const user = await req.user.save();


        res.send(user);
    });
};
