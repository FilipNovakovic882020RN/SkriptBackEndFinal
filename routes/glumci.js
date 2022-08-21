const express = require('express');
const { sequelize, Users,Glumac } = require('../models');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const route = express.Router();
route.use(cors());
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
//const id = 0;

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);


route.post('/addG', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin == 1 || usr.moderator == 1) {
                const imeGl = req.body.GName.split(',');
                const prezimeGl = req.body.GLName.split(',');
                const datumrodjenjaGl = req.body.GBirth.split(',');
                const mestorodjenjaGl = req.body.GTown.split(',');
                let a = 0;
                for(a;a<imeGl.length;a++){

                    Glumac.create({ Ime: imeGl[a],Prezime:prezimeGl[a],filmId:"",DatumRodjenja:datumrodjenjaGl[a],MestoRodjenja:mestorodjenjaGl[a]})
                
                    .then( rows =>{res.json(rows);
                                        //console.log(rows);
                                    } )
                        .catch( err => res.status(500).json(err) );
                }

            } else {
                res.status(403).json({ msg: "No permission"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

route.post('/modifyG', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin == 1 || usr.moderator == 1) {
                Glumac.findOne({where:{ Ime: req.body.GName}})
                    .then( rez => {
                        rez.Prezime = req.body.GLName;
                        rez.MestoRodjenja = req.body.GTown;
                        rez.DatumRodjenja = req.body.GBirth;
                     
                        rez.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );

            } else {
                res.status(403).json({ msg: "No permission"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});
route.get('/allG', (req, res) => {
    Glumac.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});


route.post('/deleteG', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin == 1 || usr.moderator == 1) {
                Glumac.findOne({ where: { Ime: req.body.GName } })
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

route.post('/findG', (req, res) => {
    console.log('GGG ' + req.body.Glumac)
   
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            //if (usr.admin  == 0 && usr.moderator  == 0) {
                // Reziser.findOne({where:{ Ime: req.body.Reziser}})
                //     .then( rez => {
                //         // rez.Prezime = req.body.RLName;
                //         // rez.DatumRodjenja = req.body.RBirth;
                //         // rez.MestoRodjenja = req.body.RTown;
                     
                //         rez.json();
                //             // .then( rows => res.json(rows) )
                //             // .catch( err => res.status(500).json(err) );
                //     } )
                //     .catch( err => res.status(500).json(err) );
                // const str= ''
                // if(req.body.Glumac.include(",")){
                //      str = req.body.Glumac.split(',')
                    
                // }
                //     str.localeCompare(gl=> {

                //     })
            
                // })
                    Glumac.findOne({where:{ Ime: req.body.Glumac}})
                    .then( rez => {res.json(rez);
                        //console.log(rez);
                    })
                    .catch( err => res.status(500).json(err) );

           // } else {
               // res.status(403).json({ msg: "No permission"});
            //}
        })
        .catch( err => res.status(500).json(err) );
        
});

// route.post('/searchG', (req, res) => {
    
//     Users.findOne({ where: { id: req.user.userId } })
//         .then( usr => {
          
//             if (usr.admin || usr.moderator) {
//                 res.status(403).json({ msg: "No permission"});
//                 //console.log("Admin je");

//             } else {
//                 //const ime = req.body.glime;
//                 //console.log(ime);
//                 //console.log(ime[0]);//| req.body.glime.split(',');
//                         //findone              //req.body.glumac
//                 // let b = 0;
//                    // for(b;b<1000000;b++){ 
//                        // console.log(ime[b]);      
//                         Glumac.findOne({ where: { Ime: req.body.glumac } })
//                         .then( rez =>  res.json(rez))
//                         .catch( err => res.status(500).json(err) );
//                    // }
//             }
//         })
//         .catch( err => res.status(500).json(err) );
        
// });





module.exports = route;