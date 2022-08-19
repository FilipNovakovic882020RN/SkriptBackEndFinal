function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
            moderator: document.getElementById('moderator').checked,

        };

        fetch('http://localhost:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
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
            });
    });
}