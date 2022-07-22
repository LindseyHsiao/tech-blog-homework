 function handleLoginSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById('username-login');
    const password = document.getElementById('password-login');

    fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: { "Content-Type": "application/json" }
    }).then(function () {
        document.location.replace('/dashboard')
    }).catch((err) => console.log(err))
}

document.getElementById('login-form').addEventListener('submit', handleLoginSubmit)