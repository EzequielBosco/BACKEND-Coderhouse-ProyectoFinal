const registerForm = document.getElementById('register-form')

function register(e) {
    e.preventDefault()

    const formData = new FormData(registerForm)

    const obj = {}

    formData.forEach((value, key) => (obj[key] = value))
    
    fetch('/session/register', {
        headers: {'Content-Type': 'application/json'},
        method: 'Post',
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

registerForm.addEventListener('submit', register)