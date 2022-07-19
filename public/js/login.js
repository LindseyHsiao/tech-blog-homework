async function handleLoginSubmit(){
    const username =  document.getElementById('login-username');
    const password =  document.getElementById('login-password');
    
    fetch('/api/users/login', {
        method: 'POST', 
        body: JSON.stringify({
            username: username.value, 
            password: password.value
        }), 
        headers: { "Content-Type": "application/json"}
    }).then(function(){
        document.location.replace('/')
    }).catch((err)=> console.log(err))
    }
    
    document.getElementById('login-button').addEventListener('click', handleLoginSubmit)