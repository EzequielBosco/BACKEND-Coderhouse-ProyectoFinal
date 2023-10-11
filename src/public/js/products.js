const addProductCart = document.querySelectorAll('.add-to-cart')

addProductCart.forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id')
        addToCart(productId)
    })
})

async function addToCart(productId) {
    try {
        const response = await fetch(`/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        })

        if (response.ok) {
            console.log('Product added to cart')
        } else {
            console.log('Error adding product to cart')
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

const orderPriceAsc = document.getElementById('order-by-price-asc')
orderPriceAsc.addEventListener('click', () => {
    updateSortParam('asc')
})

const orderPriceDesc = document.getElementById('order-by-price-desc')
orderPriceDesc.addEventListener('click', () => {
    updateSortParam('desc')
})

function updateSortParam(sortValue) {
    const currentURL = new URL(window.location.href)
    
    const searchParams = new URLSearchParams(currentURL.search)
    searchParams.set('sort', sortValue)
    
    currentURL.search = searchParams.toString()
    window.location.href = currentURL.toString()
}