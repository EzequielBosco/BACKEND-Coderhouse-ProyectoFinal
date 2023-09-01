const createProduct = document.getElementById('form-create')
const response = document.getElementById('response')

createProduct.addEventListener('submit', event => {
    event.preventDefault()

    const data = new FormData(createProduct)

    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    fetch('products', {
        headers: {'Content-Type': 'application/json'},
        method: 'Post',
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(data => response.innerHTML = data.message)
    .catch(err => console.log(err))
})

