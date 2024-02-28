fetch('http://localhost:3000/stores')
.then(response => response.json())
.then(stores => {
    const storesContainer = document.getElementById('stores-container');
    storesContainer.innerHTML = ''; // Clear the container before adding new store elements

    stores.forEach(store => {
        // Create a div element for each store
        const storeDiv = document.createElement('div');
        storeDiv.classList.add('store-item');
        
        // Add store information and a remove button
        storeDiv.innerHTML = `
            <p>Name: ${store.name}</p>
            <p>District: ${store.district}</p>
            <button onclick="removeStore(${store.id})">Remove</button>
        `;

        // Append the store div to the container
        storesContainer.appendChild(storeDiv);
    });
});

function removeStore(storeId) {
    if (confirm('Are you sure you want to delete this store?')) {
        fetch(`http://localhost:3000/store/${storeId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                console.log('Store removed successfully');
                // Refresh the list of stores
                fetchStores();
            } else {
                console.error('Failed to remove store');
            }
        })
    .catch(error => console.error('Error:', error));
    }
}

// Refactored fetchStores into a separate function for reuse
function fetchStores() {
    fetch('http://localhost:3000/stores')
    .then(response => response.json())
    .then(stores => {
        const storesContainer = document.getElementById('stores-container');
        storesContainer.innerHTML = ''; // Clear the container

        stores.forEach(store => {
            const storeDiv = document.createElement('div');
            storeDiv.classList.add('store-item');
            storeDiv.innerHTML = `
                <p>Name: ${store.name}</p>
                <p>District: ${store.district}</p>
                <button onclick="removeStore(${store.id})">Remove</button>
            `;
            storesContainer.appendChild(storeDiv);
        });
    });
}

// Initial fetch of stores
fetchStores();
