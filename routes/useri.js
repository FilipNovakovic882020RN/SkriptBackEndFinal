const express = require('express');
const { sequelize, Users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const route = express.Router();

route.use(cors());
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
const id = 0;

// var corsOptions = {
//     //origin: ['http://localhost:8080','http://127.0.0.1:8080'],
//    origin: '*',
//    optionsSuccessStatus: 200,
//    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
//    allowedHeaders: ['Content-Type', 'Authorization','sessionId'],
//    exposedHeaders: ['sessionId'],
//    preflightContinue: false
   
// }

//corsOptions

function authToken(req, res, next) {
    console.log(req.headers)
    const authHeader = req.headers['authorization'];
    console.log('Ovo je header ' + authHeader)
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log('OVO JE TOKEN ' + token)
    if(token == 2){
        next();
    }else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log('USAO DALJEEE')
            if (err) return res.status(403).json({ msg: err });
        
            req.user = user;
            console.log('PROSAOO')
            next();
            console.log('PROSAOO 2')
        });
    }
}

// route.use(function (req, res, next) { 
//     console.log("USAOOO u func AUTHTOKENA")
//     //console.log(req.body)
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); 
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');
//     //res.setHeader('Access-Control-Allow-Credentials', true); 
//     //res.sendStatus(200)
//  next(); 
//  //return;
// });

route.use(authToken);


route.get('/users', (req, res) => {
    Users.findAll()
        .then( rows => res.json(rows) );
        //.catch( err => res.status(500).json(err) );
});

route.post('/modUser', (req, res) => {
  
console.log(req.body)
console.log(req.body.name)
console.log(req.params)
console.log(req.user)
console.log("USAO U MOD")
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            console.log("NSAOAO USERA")
            if (usr.admin == 'true') {
                console.log("ADMIN JE")
                 Users.findOne({where:{ name: req.body.oldName}})
                //Users.findOne({where:{ name: 'admin2'}})
                    .then( rez => {
                        //console.log("Nasaooo");
                        console.log("NASAO GA")
                        console.log(rez)
                        rez.name = req.body.name;
                        rez.email = req.body.email;
                        // rez.admin = req.body.admin;
                        // rez.moderator = req.body.moderator;
                     console.log("NASAO GA2")
                    // console.log(req.body)
                        rez.save()
                            .then( rows =>  
                                //console.log("SEJVOVAO GA") ,  
                            res.json(rows),
                            console.log("SEJVOVAO GA")
                             );
                            //.catch( err => res.status(500).json(err) );
                    } );
                    //.catch( err => res.status(500).json(err) );
                    
                
            } else {
                res.status(403).json({ msg: "No permission"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});


route.post('/modU', (req, res) => {
  
    
        Users.findOne({ where: { id: req.user.userId } })
            .then( usr => {
                
                
                    
                     
                usr.name = req.body.name;
                usr.email = req.body.email;
                           
                
                usr.save()
                    .then( rows =>  
                                      
                    res.json(rows),
                    console.log("SEJVOVAO GA")
                     );
                        //.catch( err => res.status(500).json(err) );
               
                        //.catch( err => res.status(500).json(err) );
                        
                    
                
            })
            .catch( err => res.status(500).json(err) );
            
    });


route.post('/delUser', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin == 'true') {
                Users.findOne({ where: { name: req.body.name }, include: ['rentfilms'] })
                     .then( rez => {

                            rez.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                }) 
        .catch( err => res.status(500).json(err) );
            

            } else {
                res.status(403).json({ msg: "No permission"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});
// route.post('/match', (req, res) => {
//     Users.findOne({ where: { id: req.user.userId } })
//     .then( usr => {
//         if (usr.admin == 1) {
//                 Users.findOne({ where: { name: req.body.name } })
//                     .then( usr => {
//                         //console.log("radiii");
//                         //usr.password =  bcrypt.hashSync(req.body.newpassword, 10);
                
//                         usr.save()
//                             .then( rows => res.json(rows) )
//                             .catch( err => res.status(500).json(err) );

//                         // console.log("usao je u check");    
//                           //  res.json(usr);
//                     })
//                     .catch( err => res.status(500).json(err) );
//              } else {
//                     res.status(403).json({ msg: "No permission"});
//             }
//          })
//          .catch( err => res.status(500).json(err) );
// });



route.get('/check', (req, res) => {
console.log("kakak");
    Users.findOne({ where: { id: req.user.userId } }) //req.user.userId 
        .then( usr => {
                
                console.log("usao je u check");    
                //console.log(usr.id); 
                console.log('OVO JE ADMIN ' + usr.admin + ', OVO JE MODERATOR ' + usr.moderator + ', OVO JE USER ' + usr.onlyUser); 
                
                const dat = {privilageAdmin: usr.admin,privilageModerator: usr.moderator,privilageUser: usr.onlyUser}
               
                res.json(dat);
                
        })
        .catch( err => /*res.status(500).json(err)*/ res.status(403).json({ msg: "No User"}) );
});


module.exports = route;