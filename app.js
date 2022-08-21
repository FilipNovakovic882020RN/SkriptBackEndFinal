const express = require('express');
const { sequelize } = require('./models');
const usr = require('./routes/useri');
const mov = require('./routes/movies');
const actr = require('./routes/glumci');
const rez = require('./routes/reziseri');
const path = require('path');
const cors = require('cors');

//const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
console.log("LALA")
// var corsOptions = {
//     //origin: ['http://localhost:8080','http://127.0.0.1:8080'],
//    origin: '*',
//    optionsSuccessStatus: 200,
//    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
//    allowedHeaders: ['Content-Type', 'Authorization','sessionId'],
//    exposedHeaders: ['sessionId'],
//    preflightContinue: false
   
// }

// app.use(cors(corsOptions));

app.use('/admin', usr);
app.use('/admin', mov);
app.use('/admin', actr);
app.use('/admin', rez);


// function getCookies(req) {
//     console.log("proverava cookie")
//     if (req.headers.cookie == null) return {};

//     const rawCookies = req.headers.cookie.split('; ');
//     const parsedCookies = {};

//     rawCookies.forEach( rawCookie => {
//         const parsedCookie = rawCookie.split('=');
//         parsedCookies[parsedCookie[0]] = parsedCookie[1];
//     });

//     return parsedCookies;
// };

// function authToken(req, res, next) {
//     const cookies = getCookies(req);
//     const token = cookies['token'];
  
//     if (token == null) return res.redirect(301, '/login');
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
//         if (err) return res.redirect(301, '/login');
    
//         req.user = user;
    
//         next();
//     });
// }



// app.get('/register', (req, res) => {
//     res.sendFile('register.html', { root: './static' });
// });

// app.get('/login', (req, res) => {
//     res.sendFile('login.html', { root: './static' });
    
// });

// app.get('/', (req, res) => {
//     res.sendFile('index.html', { root: './static' });
// });


app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
})
