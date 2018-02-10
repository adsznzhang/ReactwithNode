const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
const authRoutes = require('./routes/authRoutes.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI,{ useMongoClient: true });

const app = express();
//app.use()把中间程序传递到每一个路由
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
require('./routes/billingRoutes.js')(app);

// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// });

if(process.env.NODE_ENV === 'production') {
    //express will serve up production assets
    //like our main.js file, or main.css file
    //如果有任何来自前端的路由在后端没有找到，那么就去这个文件下去找~
    app.use(express.static('client/build'));


    //Express will serve up the index.html file
    //if it doesn't recognize the route
    //相当于最后一道防线，如果前面两者都没发现，就把index.html发送
    const path = require('path');
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
};

const PORT  = process.env.PORT || 5000;
app.listen(PORT);
