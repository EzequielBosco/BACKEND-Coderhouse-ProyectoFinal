const loginForm = document.getElementById('login-form')

function login(e) {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    fetch('/session/login', {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'Post',
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.message === 'Login successful' && data.redirect) {
            window.location.href = data.redirect
        }
    })
    .catch(err => console.log(err))
}

loginForm.addEventListener('submit', login)