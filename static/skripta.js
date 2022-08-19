function init() {
/*
    const cookies = document.cookie.split(',');
    const cookies1 = cookies[0].split('=');
    const cookies2 = cookies[1].split('=');
    const token = cookies1[cookies1.length - 1];

    
    const token1 = cookies2[cookies2.length - 1];
  */
    const cookies = document.cookie.split('=');
    
    const token = cookies[cookies.length - 1];
     

    fetch('http://localhost:8001/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');
            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>, Admin:${el.admin},Moderator:${el.moderator}`;
            });
        });

        document.getElementById('moduser').addEventListener('click', e => {
            e.preventDefault();
            const data = {
                name: document.getElementById('usname').value,
                admin: document.getElementById('usadmin').checked,
                moderator: document.getElementById('usmoderator').checked,
                newname: document.getElementById('newname').value,
                newpassword: document.getElementById('newpassword').value
            }


            document.getElementById('usname').value = '';
            document.getElementById('newname').value = '';
            document.getElementById('newpassword').value = '';
           // document.getElementById('usmoderator').value = '';



            fetch('http://localhost:8001/admin/modUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then( el => {             
                    if (el.msg) {
                        alert(el.msg);
                    } else {
        
                        document.getElementById('usrLst').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>, Admin:${el.admin},Moderator:${el.moderator}`;
                                                                                   
                    }
                });


                
            fetch('http://localhost:8001/admin/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() );



        });


        document.getElementById('deleteuser').addEventListener('click', e => {
            e.preventDefault();
            const data = {
                name: document.getElementById('usname').value
               
            }


            document.getElementById('usname').value = '';
            document.getElementById('newname').value = '';
           // document.getElementById('usadmin').disable
           // document.getElementById('usmoderator').value = '';



            fetch('http://localhost:8001/admin/delUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then( el => {             
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        document.getElementById('usrLst').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>, Admin:${el.admin},Moderator:${el.moderator}`;
                                                                                   
                    }
                });



        });

        //----------------Film--------------------------------
    document.getElementById('msgBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            filmname: document.getElementById('filmname').value,
            duration: document.getElementById('duration').value,
            count: document.getElementById('count').value,
            rezisername:document.getElementById('rezisername').value,
            Rprezime: document.getElementById('Rprezime').value,
            Rdatumrodjenja:document.getElementById('Rdatumrodjenja').value,
            Rmestorodjenja: document.getElementById('Rmestorodjenja').value,
            glumacname: document.getElementById('glumacname').value,
            Gprezime: document.getElementById('Gprezime').value,
            Gdatumrodjenja: document.getElementById('Gdatumrodjenja').value,
            Gmestorodjenja: document.getElementById('Gmestorodjenja').value

        };
        


        document.getElementById('filmname').value = '';
        document.getElementById('rezisername').value = '';
       document.getElementById('duration').value = '';
        document.getElementById('count').value = '';
        document.getElementById('glumacname').value = '';
        document.getElementById('Rprezime').value = '';
        document.getElementById('Rdatumrodjenja').value = '';
       document.getElementById('Rmestorodjenja').value = '';
        document.getElementById('Gprezime').value = '';
        document.getElementById('Gdatumrodjenja').value = '';
        document.getElementById('Gmestorodjenja').value = '';
        
        

        fetch('http://localhost:8001/admin/addfilm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then( el => {             
                if (el.msg) {
                    alert(el.msg);
                } else {
                   // document.cookie = `token1=${el.token.token1};SameSite=Lax`;
                    document.getElementById('msgLst').innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}, Reziser: ${el.Reziser}</li>`;
                                                                                //.rows
                }
            });
            
            fetch('http://localhost:8001/admin/addR', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`//,
                //'AuthorizationFilm': `Bearer ${token1}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json())
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('RLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}</li>`;
                }
            });



            fetch('http://localhost:8001/admin/addG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json())
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('GLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}</li>`;
                }
            });

    });

    document.getElementById('ModifyFilm').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            filmname: document.getElementById('filmname').value,
            rezisername:document.getElementById('rezisername').value,
            duration: document.getElementById('duration').value,
            count: document.getElementById('count').value,
        };

        document.getElementById('filmname').value = '';
        document.getElementById('rezisername').value = '';
        document.getElementById('duration').value = '';
        document.getElementById('count').value = '';

        fetch('http://localhost:8001/admin/modifyfilm', {
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
                    document.getElementById('msgLst').innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}, Reziser: ${el.Reziser}</li>`;
                }
            });



            fetch('http://localhost:8001/admin/reziser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() );


    });

    document.getElementById('DeleteFilm').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            filmname: document.getElementById('filmname').value,
            rezisername:document.getElementById('rezisername').value
        };

        document.getElementById('filmname').value = '';
        document.getElementById('rezisername').value = '';

        fetch('http://localhost:8001/admin/deleteF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json());
            /*
            .then( el => {     //------------------------------------------------
                const data3 = {
                    filmname: el.id
                    
                };
            });*/
        
    });

    fetch('http://localhost:8001/admin/allfilms', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('msgLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Naziv: ${el.Naziv}, Reziser: ${el.Reziser}</li>`;
            });
        });



//---------------------------Reziser-----------------------------------
    document.getElementById('getReziser').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            RName: document.getElementById('RName').value,
            RLName:document.getElementById('RLName').value,
            RBirth: document.getElementById('RBirth').value,
            RTown: document.getElementById('RTown').value
        };

        document.getElementById('RName').value = '';
        document.getElementById('RLName').value = '';
        document.getElementById('RBirth').value = '';
        document.getElementById('RTown').value = '';

        fetch('http://localhost:8001/admin/modifyR', {
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
                    document.getElementById('RLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}</li>`;
                }
            });

    });

    document.getElementById('DeleteReziser').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            RName: document.getElementById('RName').value,
            RLName:document.getElementById('RLName').value,
            RBirth: document.getElementById('RBirth').value,
            RTown: document.getElementById('RTown').value
        };

        document.getElementById('RName').value = '';
        document.getElementById('RLName').value = '';
        document.getElementById('RBirth').value = '';
        document.getElementById('RTown').value = '';

        fetch('http://localhost:8001/admin/deleteR', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() );
            

    });

    fetch('http://localhost:8001/admin/allR', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('RLst');

            data.forEach( el => {
                document.getElementById('RLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}</li>`;
            });
        });
    
    //----------------------Glumac------------------------------------

    document.getElementById('getGlumac').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            GName: document.getElementById('GName').value,
            GLName:document.getElementById('GLName').value,
            GBirth:document.getElementById('GBirth').value,
            GTown:document.getElementById('GTown').value
        };

        document.getElementById('GName').value = '';
        document.getElementById('GLName').value = '';
        document.getElementById('GBirth').value = '';
        document.getElementById('GTown').value = '';

        fetch('http://localhost:8001/admin/modifyG', {
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
                    document.getElementById('GLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}</li>`;
                }
            });

    });

    document.getElementById('DeleteGlumac').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            GName: document.getElementById('GName').value,
            GLName:document.getElementById('GLName').value,
            GBirth:document.getElementById('GBirth').value,
            GTown:document.getElementById('GTown').value
        };

        document.getElementById('GName').value = '';
        document.getElementById('GLName').value = '';
        document.getElementById('GBirth').value = '';
        document.getElementById('GTown').value = '';

        fetch('http://localhost:8001/admin/deleteG', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() );
        
    });


    fetch('http://localhost:8001/admin/allG', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('GLst');

            data.forEach( el => {
                document.getElementById('GLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.Ime}, Prezime: ${el.Prezime}</li>`;
            });
        });



    

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}