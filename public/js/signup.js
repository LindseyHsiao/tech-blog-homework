function handleSignupSubmit(event) {
    event.preventDefault()
    const username = document.getElementById('username-signup');
    const password = document.getElementById('password-signup');

    fetch('/api/users', {
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

document.getElementById('signup-form').addEventListener('submit', handleSignupSubmit)