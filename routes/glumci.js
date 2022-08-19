const express = require('express');
const { sequelize, Users,Glumac } = require('../models');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const route = express.Router();
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
            if (usr.admin || usr.moderator) {
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
            if (usr.admin || usr.moderator) {
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
            if (usr.admin || usr.moderator) {
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

route.post('/searchG', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
          
            if (usr.admin || usr.moderator) {
                res.status(403).json({ msg: "No permission"});
                //console.log("Admin je");

            } else {
                //const ime = req.body.glime;
                //console.log(ime);
                //console.log(ime[0]);//| req.body.glime.split(',');
                        //findone              //req.body.glumac
                // let b = 0;
                   // for(b;b<1000000;b++){ 
                       // console.log(ime[b]);      
                        Glumac.findOne({ where: { Ime: req.body.glumac } })
                        .then( rez =>  res.json(rez))
                        .catch( err => res.status(500).json(err) );
                   // }
            }
        })
        .catch( err => res.status(500).json(err) );
        
});





module.exports = route;