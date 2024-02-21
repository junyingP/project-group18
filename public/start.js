

fetch('http://localhost:3000/stores')
.then(response => response.json())
.then(stores => {
    console.log(stores)
})