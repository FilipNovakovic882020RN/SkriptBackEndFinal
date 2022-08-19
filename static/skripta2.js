function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
       br = 0;
       film = 0;
       //c ;
    fetch('http://localhost:8001/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email},Admin: ${el.admin},Moderator: ${el.moderator}</li>`;
            });
        });
/*
     fetch('http://localhost:8000/admin/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('msgLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Body: ${el.body}, User: ${el.user.id}</li>`;
            });
        });
        */

//--------------------FILMOVI------------------------------
     document.getElementById('getFilm').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            filmName: document.getElementById('filmName').value,
            reziser: document.getElementById('reziser').value,
            trajanje: document.getElementById('trajanje').value,
            count: document.getElementById('count').value,
            glumac: document.getElementById('glumac').value
        };

           document.getElementById('filmName').value = '';
            document.getElementById('reziser').value = '';
            document.getElementById('trajanje').value = '';
            document.getElementById('count').value = '';
            document.getElementById('glumac').value = '';

        fetch('http://localhost:8001/admin/searchF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                  // c = el.Glumac;

                    //alert(c);
                    document.getElementById('filmsLst').innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}</li>,Reziser: ${el.Reziser}</li>,Glumac: ${el.Glumac}</li>,Trajanje: ${el.Trajanje}</li>,Count: ${el.Count}</li>,`;
                }
            });
            
            fetch('http://localhost:8001/admin/searchR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        document.getElementById('rezisersLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}, Datum-Rodjenja: ${el.DatumRodjenja}, Mesto-Rodjenja: ${el.MestoRodjenja}</li>`;
                    }
                });

            
                fetch('http://localhost:8001/admin/searchG', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( el => {
                        if (el.msg) {
                            alert(el.msg);
                        } else {
                           // let a = 0;
                            //for(a;a<1000000;a++){
                                //alert(el.Ime);
                                document.getElementById('glumacsLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}, Datum-Rodjenja: ${el.DatumRodjenja}, Mesto-Rodjenja: ${el.MestoRodjenja}</li>`;
                           // }
                        }
                    });





                    fetch('http://localhost:8001/admin/searchDuration', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    })
                        .then( res => res.json() )
                        .then( el => {
                            if (el.msg) {
                                alert(el.msg);
                            } else {
                                let a = 0;
                                    for(a;a<1000000;a++){
                                document.getElementById('filmsLst').innerHTML += `<li>ID: ${el[a].id}, Naziv: ${el[a].Naziv}</li>,Reziser: ${el[a].Reziser}</li>,Glumac: ${el[a].Glumac}</li>,Trajanje: ${el[a].Trajanje}</li>,Count: ${el[a].Count}</li>,`;
                                    }
                            }
                        });

                    
                        fetch('http://localhost:8001/admin/searchCount', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(data)
                        })
                            .then( res => res.json() )
                            .then( el => {
                                if (el.msg) {
                                    alert(el.msg);
                                } else {
                                    let a = 0;
                                    for(a;a<1000000;a++){
                                        document.getElementById('filmsLst').innerHTML += `<li>ID: ${el[a].id}, Naziv: ${el[a].Naziv}</li>,Reziser: ${el[a].Reziser}</li>,Glumac: ${el[a].Glumac}</li>,Trajanje: ${el[a].Trajanje}</li>,Count: ${el[a].Count}</li>`;
                                    }
                                }
                            });


    });

    


    document.getElementById('rentFilm').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            filmName: document.getElementById('filmName').value
        };
            
            


        fetch('http://localhost:8001/admin/rentF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    br = el.Count;
                    const data2 = {
                        filmName: document.getElementById('filmName').value,
                        count: br - 1
                      
                    };
                    fetch('http://localhost:8001/admin/RUFilm', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data2)
                    })
                        .then( res => res.json() )
                        .then( el => {
                            if (el.msg) {
                                alert(el.msg);
                            } else {
                            
                                const data3 = {
                                    filmName: document.getElementById('filmName').value
                                   
                                  
                                };
                                
                                document.getElementById('filmName').value = '';
                                 document.getElementById('reziser').value = '';
                                 document.getElementById('trajanje').value = '';
                                document.getElementById('count').value = '';
                                 document.getElementById('glumac').value = '';
                                 
                                fetch('http://localhost:8001/admin/createRF', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify(data3)
                                })
                                    .then( res => res.json() )
                                    .then( el => {
                                        if (el.msg) {
                                            alert(el.msg);
                                        } else {
                                            document.getElementById('RfilmsLst').innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}</li>`;
                                        }
                                    });
                           
                            }
                        });

                
                }
            });


    });


    document.getElementById('deleteFilm').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            filmName: document.getElementById('filmName').value
        };
         
        
        fetch('http://localhost:8001/admin/firstFindF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    const film = {
                        filmName: el.Naziv
                    };


            
            fetch('http://localhost:8001/admin/recoveryfindF', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(film)//data
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        br = el.Count;
                    
                        const data2 = {
                            filmName: document.getElementById('filmName').value,
                            count:  parseInt(br)+ parseInt("1")
                        
                        };
                        
                        
                        fetch('http://localhost:8001/admin/recoveryF', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(data2)
                        })
                            .then( res => res.json() )
                            .then( el => {
                                if (el.msg) {
                                    alert(el.msg);
                                } else {
                                    const data3 = {
                                        filmName: document.getElementById('filmName').value
                                    
                                    
                                    };
                                    
                                    document.getElementById('filmName').value = '';
                                    document.getElementById('reziser').value = '';
                                    document.getElementById('trajanje').value = '';
                                    document.getElementById('count').value = '';
                                    document.getElementById('glumac').value = '';
                                    
                                    fetch('http://localhost:8001/admin/deleteRF', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify(data3)
                                    })
                                        .then( res => res.json() )
                                        .then( el => {
                                            if (el.msg) {
                                                alert(el.msg);
                                            } 
                                        });
                            
                                }
                            });

                    
                    }
                });
            }
        });
    });




    fetch('http://localhost:8001/admin/allRF', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('RfilmsLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}</li>`;
            });
        });



    /*fetch('http://localhost:8000/api/allF2', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
     })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('filmsLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}</li>`;
            });
        });
    */
   
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}