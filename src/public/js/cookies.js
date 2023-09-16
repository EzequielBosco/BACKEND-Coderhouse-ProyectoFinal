const formCookie = document.getElementById('form-cookie')
// formCookie.addEventListener('submit', function(event) {
//     event.preventDefault()
// })

function getCookie() {
    fetch('/cookies/get')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
   