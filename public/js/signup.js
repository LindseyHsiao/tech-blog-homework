async function handleSignupSubmit(){
const username =  document.getElementById('signup-username');
const password =  document.getElementById('signup-password');

fetch('/api/users', {
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

document.getElementById('signup-button').addEventListener('click', handleSignupSubmit)