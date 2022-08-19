function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    
                    fetch('http://localhost:9000/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                    })
                    .then( res => res.json() )
                    .then( el => {
                            if(el.admin){
                                window.location.href = 'index.html';
                            }else if(el.moderator){
                                window.location.href = 'index.html'; 
                            }else{
                                window.location.href = 'index2.html';
                            }

        

                    });



                    //window.location.href = 'index.html';
                }
            });
    });
}


/*fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;

                    



                    window.location.href = 'index.html';
                }
            });
            */