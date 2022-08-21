const express = require('express');
const { sequelize, Users } = require('./models');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usr = require('./routes/useri');
const mov = require('./routes/movies');
const actr = require('./routes/glumci');
const rez = require('./routes/reziseri');
const path = require('path');
const history = require('connect-history-api-fallback');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs')

const app = express();

var corsOptions = {
     //origin: ['http://localhost:8080','http://127.0.0.1:8080'],
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','sessionId'],
    exposedHeaders: ['sessionId'],
    preflightContinue: false
    
}

app.use('/admin', usr);
app.use('/admin', mov);
app.use('/admin', actr);
app.use('/admin', rez);


app.use(express.json());
app.use(cors(corsOptions));


app.post('/api_register', (req, res) => {

    console.log('USAOOO2');

    const obj = {
        name: req.body.name,
        email: req.body.email,
        admin: req.body.admin,
        moderator: req.body.moderator,
        onlyUser: req.body.user,
        password: bcrypt.hashSync(req.body.password, 10)
        //password: req.body.password
    };

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        console.log(token);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/api_login', (req, res) => {
   // console.log('Stigao u login')

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {
            //console.log('Pronasao usera')
            if (bcrypt.compareSync(req.body.password, usr.password)) {
               // console.log('Password se podudara')
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                console.log('Token ' + token);
        
                
                res.json({ token: token });
                //res.json(obj);
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

app.get('/check', (req, res) => {
 
     const dat = {privilageUser: '0'}
                   
      res.json(dat);
                    

    });

    const staticMdl = express.static(path.join(__dirname, 'dist'));

    app.use(staticMdl);

    app.use(history({index: '/index.html'}));

    app.use(staticMdl);

    app.listen({ port: process.env.PORT || 8088 }, async () => {
        await sequelize.authenticate();
    });


