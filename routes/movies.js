const express = require('express');
const { sequelize, Users,Film,Rentfilm,Reziser } = require('../models');
//const jwt = require('jsonwebtoken');

require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
//et ime;

// function authToken(req, res, next) {
//     console.log('SAD PROVERAVA TOKEN');
//     const authHeader = req.headers['authorization'];
//     console.log('Ovo je headerrr ' + authHeader)
//     const token = authHeader && authHeader.split(' ')[1];
//     console.log('OVO JE TOKENNN ' + token)
//     if (token == null) return res.status(401).json({ msg: err });
//     console.log('IDE DALJEEE')
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         console.log('USAO DALJEEE')
//         if (err) return res.status(403).json({ msg: err });
    
//         req.user = user;
//         console.log('PROSAOO')
//         next();
//         console.log('PROSAOO 2')
//     });
    
// }

// route.use(function (req, res, next) { 
//     console.log("USAOOO u func")
//     //console.log(req.body)
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); 
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true); 
//     res.sendStatus(200)
//  next(); 
//  //return;
// });

//route.use(authToken);

route.post('/addfilm', (req, res) => {
    console.log('STIGAO');
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                
                
        
                //res.json({ token: token });

                
                

                Film.create({ Naziv: req.body.MName, Reziser: req.body.RName, Trajanje: req.body.duration,Count: req.body.copies,Glumac: req.body.GName})
                    .then( rows =>{
                        //const flm = {
                           // filmId: rows.id
                        //};
                
                        
                        //const token1 = jwt.sign(flm, process.env.ACCESS_TOKEN_SECRET);
        
                       // console.log(token1);
                       
                             //res.json({ token: token1,rows: rows });
                             
                             res.json(rows);
                                    } )
                    //.catch( err => res.status(500).json(err) );
                
            } else {
               // res.status(403).json({ msg: "No permission"});
            }
        })
        //.catch( err => res.status(500).json(err) );
        
});

route.post('/modifyfilm', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Film.findOne({where:{ Naziv: req.body.filmname}})
                    .then( rez => {
                        rez.Trajanje = req.body.duration;
                        rez.Count = req.body.count;
                     
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

route.post('/deleteF', (req, res) => {
    console.log('USAO U DELETE')
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Film.findOne({ where: { Naziv: req.body.MName } })
                .then( rez => {
                        //console.log(rez);
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


route.get('/allfilms', (req, res) => {
    console.log('ALLFILMS')
    Film.findAll()
        .then( rows =>{ 
            //console.log('TU JE ISPRED')
            console.log('OVO SU FILMOVI PRI DOHVATANJU ' + JSON.stringify(rows)) ;
            console.log('OVO SU FILMOVI PRI DOHVATANJU ' + rows) ;
            res.json(JSON.stringify( rows ) );
           
        })
            
        .catch( err => res.status(500).json(err) );
});

route.get('/allF2', (req, res) => {
    
    Film.findAll()
    .then( rez => { res.json(rez);
            //console.log(rez); 
                      
    })
    .catch( err => res.status(500).json(err) );


});

route.post('/searchF', (req, res) => {
    console.log('USAO3')
    console.log(req.body)
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
           
            // if (usr.admin || usr.moderator) {
            //     res.status(403).json({ msg: "No permission"});
            //     console.log("Admin je");

            // } else {
                console.log('IMA PERMISION')
                Film.findOne({ where: { Naziv: req.body.id } })
                .then( rez =>{ //rez => { res.json(rez);
                       //console.log(rez.Naziv); 
                        //console.log("Usao je u searchF 3"); 
                       // if(rez.Naziv == undefined){
                           // res.json({ msg: "Ne postoji tabelica"});
                      //  }else{
                      /// ime = res.Glumac;
                            res.json(rez);
                            console.log('PRONASAO FILM')
                      //  }
                        
                })
                .catch( err => res.json({ msg: "This movie doesnt exists"})); //res.status(500).json(err) );
           // }
        })
        .catch( err => res.status(500).json(err) );
        
});

route.post('/searchDuration', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
           
            if (usr.admin || usr.moderator) {
                res.status(403).json({ msg: "No permission"});
                //console.log("Admin je");

            } else {
              
                Film.findAll({ where: { Trajanje: req.body.trajanje } })
                .then( rez =>res.json(rez))
                .catch( err => res.json({ msg: "This movie doesnt exists"})); //res.status(500).json(err) );
            }
        })
        .catch( err => res.status(500).json(err) );
        
});
route.post('/searchCount', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
           
            if (usr.admin || usr.moderator) {
                res.status(403).json({ msg: "No permission"});
                //console.log("Admin je");

            } else {
                
                Film.findAll({ where: { Count: req.body.count} })
                .then( rez =>{res.json(rez);
                    //console.log(rez);
                })
                .catch( err => res.json({ msg: "This movie doesnt exists"})); //res.status(500).json(err) );
              
            }
        })
        .catch( err => res.status(500).json(err) );
        
});




route.post('/rentF', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
          
            if (usr.admin || usr.moderator) {
                res.status(403).json({ msg: "No permission"});
               // console.log("Admin je");

            } else {
                
                Film.findOne({ where: { Naziv: req.body.filmName } })
                .then( rez =>{
                      
                      
                        if(rez.Count > 0){
                           // console.log(rez.Count);
                            res.json(rez);
                        }else{
                            res.json({ msg: "There is no aveaible copies, they are all rented"})
                        }
                               
                })
                .catch( err => res.json({ msg: "This movie doesnt exists"})); 
            }
        })
        .catch( err => res.status(500).json(err) );
        
});

route.post('/RUFilm', (req, res) => {

                Film.findOne({where:{ Naziv: req.body.filmName}})
                    .then( rez => { 
        
                        rez.Count = req.body.count;
                     
                        rez.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );


        
});
route.post('/createRF', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
      
        if (usr.admin || usr.moderator) {
            res.status(403).json({ msg: "No permission"});
           

        } else {
            Rentfilm.create({ Naziv: req.body.filmName,userId: req.user.userId,filmId:"",reziserId:"",glumacId:""})
            .then( rez =>res.json(rez))
            .catch( err => res.status(500).json(err) );
        }
    })
    .catch( err => res.status(500).json(err) );


  /*  console.log("Usao u createRF");
                Rentfilm.create({ Naziv: req.body.filmName,userId:"",filmId:"",reziserId:"",glumacId:""})
                    .then( rez =>res.json(rez))
                    .catch( err => res.status(500).json(err) );
                    */
        
});

route.post('/deleteRF', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                res.status(403).json({ msg: "No permission"});
            
            } else {     
                Rentfilm.findOne({ where: { Naziv: req.body.filmName,userId: req.user.userId } })
                     .then( rez => {

                            rez.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                }) 
        .catch( err => res.status(500).json(err) );
            }
        })
        .catch( err => res.status(500).json(err) );
        
});
route.post('/recoveryF', (req, res) => {
 
                Film.findOne({where:{ Naziv: req.body.filmName}})
                    .then( rez => { 
        
                        rez.Count = req.body.count;
                     
                        rez.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    } )
                    .catch( err => res.status(500).json(err) );


        
});

route.post('/recoveryfindF', (req, res) => {
   
                Film.findOne({where:{ Naziv: req.body.filmName}})
                    .then( rez => res.json(rez))
                    .catch( err => res.status(500).json(err) );


        
});
route.post('/firstFindF', (req, res) => {
   
    Rentfilm.findOne({where:{ Naziv: req.body.filmName}})
        .then( rez => {res.json(rez);
            //console.log(rez);
        })
        .catch( err => res.status(500).json(err) );



});



route.get('/allRF', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
     
        if (usr.admin) {
            res.status(403).json({ msg: "No permission"});
           

        } else {
            Rentfilm.findAll({where:{userId:req.user.userId}})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
        }
    })
    .catch( err => res.status(500).json(err) );

    /*console.log("Usao u AllRF");
    Rentfilm.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );*/
});

/*
route.post('/del', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                res.status(403).json({ msg: "No permission"});
            
            } else {     
                Users.findOne({ where: { name: req.body.filmName }, include: ['rentfilms'] })
             .then( usr => {
                 usr.destroy()
                    .then( rows => res.json(rows) )
                     .catch( err => res.status(500).json(err) );
            }) 
        .catch( err => res.status(500).json(err) );
            }
        })
        .catch( err => res.status(500).json(err) );
        
});*/

module.exports = route;
