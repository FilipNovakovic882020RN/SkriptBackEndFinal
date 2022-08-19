const express = require('express');
const { sequelize, Users,Reziser } = require('../models');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
const id = 0;

function authToken(req, res, next) {
    console.log("PROVERA")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

 
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
       
        next();
    });

}
/*
function authTokenFilm(req, res, next) {
    const authHeaderFilmId = req.headers['AuthorizationFilm'];
   const token1 = authHeaderFilmId && authHeaderFilmId.split(' ')[1];
  
    if (token1 == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token1, process.env.ACCESS_TOKEN_SECRET, (err, film) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        
        req.film = film;
    
        next();
    });

}
*/

route.use(authToken);
//route.use(authTokenFilm);



route.post('/addR', (req, res) => {
   
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                                                                                // userId: req.user.userId
                Reziser.create({ Ime: req.body.RName,Prezime:req.body.RLName,filmId: "0" ,DatumRodjenja:req.body.RBirth,MestoRodjenja:req.body.RTown})
                    .then( rows =>{
                        res.json(rows);
                        //console.log(req.film)
                    })
                    .catch( err => res.status(500).json(err) );

            } else {
                res.status(403).json({ msg: "No permission"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

route.post('/modifyR', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Reziser.findOne({where:{ Ime: req.body.RName}})
                    .then( rez => {
                        rez.Prezime = req.body.RLName;
                        rez.DatumRodjenja = req.body.RBirth;
                        rez.MestoRodjenja = req.body.RTown;
                     
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

route.post('/deleteR', (req, res) => {
    
    console.log("stigaoooo")
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Reziser.findOne({ where: { Ime: req.body.RName } })
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

route.get('/allR', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Reziser.findAll()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                
            } else {
                res.status(403).json({ msg: "No permission"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

route.post('/searchR', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                res.status(403).json({ msg: "No permission"});
                

            } else {
               
                Reziser.findOne({ where: { Ime: req.body.reziser } })
                .then( rez => {res.json(rez);
                        console.log(res);
                })
                .catch( err => res.status(500).json(err) );
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

module.exports = route;