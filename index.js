const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
require('./services/passport.js');


const app = express();

authRoutes(app);

// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// });

const PORT  = process.env.PORT || 5000;
app.listen(PORT);
