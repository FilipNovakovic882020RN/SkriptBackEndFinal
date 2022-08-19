const express = require('express');
const { sequelize, Users } = require('./models');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();


const app = express();

// var corsOptions = {
//      //origin: ['http://localhost:8080','http://127.0.0.1:8080'],
//     origin: '*',
//     optionsSuccessStatus: 200,
//     methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization','sessionId'],
//     exposedHeaders: ['sessionId'],
//     preflightContinue: false
    
// }

app.use(express.json());
app.use(cors());//corsOptions



app.post('/register', (req, res) => {

    console.log('USAOOO2');

    const obj = {
        name: req.body.name,
        email: req.body.email,
        admin: req.body.admin,
        moderator: req.body.moderator,
       // password: bcrypt.hashSync(req.body.password, 10)
        password: req.body.password
    };

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name
        };

        //const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        //console.log(token);
        
        //res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            //if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
               // const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
               // console.log(token);
        
                
               // res.json({ token: token });
                res.json(obj);
            //} else {
             //   res.status(400).json({ msg: "Invalid credentials"});
            //}
        })
        .catch( err => res.status(500).json(err) );
});


app.post('/check', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {
               // console.log("usao je u check");    
                res.json(usr);
        })
        .catch( err => res.status(500).json(err) );
});





app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});