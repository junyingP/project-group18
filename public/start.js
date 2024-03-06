function fetchStores() {
    fetch('http://localhost:3000/stores')
    .then(response => response.json())
    .then(fetchedStores => {
        stores = fetchedStores; // Update the global stores array
        displayStores(stores); // Use a separate function to display stores
    });
}

function displayStores(storesToDisplay) {
    const storesContainer = document.getElementById('stores-container');
    storesContainer.innerHTML = '';

    storesToDisplay.forEach(store => {
        const storeDiv = document.createElement('div');
        storeDiv.classList.add('store-item');
        storeDiv.innerHTML = `
            <p>Name: ${store.name}</p>
            <p>District: ${store.district}</p>
            <p>URL: <a href="${store.url}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <p>Address: ${store.address || 'N/A'}</p>
            <p>Opening Hours: ${store.opening_hours || 'N/A'}</p>
            <button onclick="editStore(${store.id})" class="edit-button">Edit</button>
            <button onclick="removeStore(${store.id})" class="remove-button">Remove</button>
        `;
        storesContainer.appendChild(storeDiv);
    });
}

// Function to remove a store
function removeStore(storeId) {
    if (confirm('Are you sure you want to delete this store?')) {
        fetch(`http://localhost:3000/store/${storeId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                console.log('Store removed successfully');
                fetchStores(); // Refresh the list of stores
            } else {
                console.error('Failed to remove store');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

// Function to edit a store
function editStore(storeId) {
    const newName = prompt('Enter the new name for the store:');
    if (newName) {
        fetch(`/store/${storeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName })
        })
        .then(response => {
            if (response.ok) {
                console.log('Store updated successfully');
                fetchStores(); // Refresh the list
            } else {
                console.error('Failed to update store');
            }
        })
        .catch(error => console.error('Error updating store:', error));
    }
}

function addStore() {
    const storeData = {
        name: document.getElementById('name').value,
        url: document.getElementById('url').value,
        district: document.getElementById('district').value,
        rating: parseInt(document.getElementById('rating').value || '0', 10),
        address: document.getElementById('address').value, // Assuming you have an input field for address
        opening_hours: document.getElementById('opening_hours').value // Assuming you have an input field for opening hours
    };

    fetch('/stores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Store added successfully');
            fetchStores(); // Refresh the list of stores
        } else {
            console.error('Failed to add store');
        }
    })
    .catch(error => console.error('Error adding store:', error));
}

// Function to sort stores
let stores = []; // Global array to hold the stores
let sortOrder = 'asc'; // Initial sort order

function sortStores() {
    fetch('http://localhost:3000/stores')
    .then(response => response.json())
    .then(stores => {
        if (sortOrder === 'asc') {
            stores.sort((a, b) => a.name.localeCompare(b.name));
            sortOrder = 'desc';
        } else {
            stores.sort((a, b) => b.name.localeCompare(a.name));
            sortOrder = 'asc';
        }
        displayStores(stores); // Use the global stores array for display
    })
    .catch(error => console.error('Error sorting stores:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for form submission
    const addForm = document.getElementById('add-store-form');
    if (addForm) {
        addForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            addStore();
        });
    }
    
    // Event listener for sorting stores
    const sortButton = document.getElementById('sort-stores');
    if (sortButton) {
        sortButton.addEventListener('click', sortStores);
    } else {
        console.error('Sort button not found');
    }

    fetchStores(); // Initial fetch of stores
});

