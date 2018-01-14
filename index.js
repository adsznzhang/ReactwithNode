const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const authRoutes = require('./routes/authRoutes.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

const app = express();

authRoutes(app);

// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// });

const PORT  = process.env.PORT || 5000;
app.listen(PORT);
