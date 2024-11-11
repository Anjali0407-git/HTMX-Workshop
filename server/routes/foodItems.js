const express = require('express');
const router = express.Router();
const { foodItems } = require('../data/foodItems');

// const foodItems = [
//     { id: 1, name: 'Pizza', price: 10 },
//     { id: 2, name: 'Burger', price: 5 },
//     { id: 3, name: 'Pasta', price: 8 },
//     // Add more food items here
// ];

// router.get('/', (req, res) => {
//     const search = req.query.search;
//     if (search) {
//         const filteredItems = foodItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
//         res.json(filteredItems);
//     } else {
//         res.json(foodItems);
//     }
// });

router.get('/', (req, res) => {
    const search = req.query.search;
    let itemsToDisplay = foodItems;
    console.log(foodItems)

    if (search) {
        itemsToDisplay = foodItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Create HTML string for each food item
    const itemsHtml = itemsToDisplay.map(item =>
        // `<div class="food-item">
        //     <span>${item.name} - $${item.price}</span>
        //     <button hx-post="/api/cart/add-to-cart" hx-params="id=${item.id}" hx-target="#cart-items" hx-swap="beforeend">Add to Cart</button>
        // </div>`
        `<div class="food-item bg-white p-4 shadow rounded flex justify-between items-center mb-2">
            <span>${item.name} - $${item.price}</span>
            <button hx-post="/api/cart/add-to-cart" hx-params="id=${item.id}" hx-target="#cart-items" hx-swap="beforeend" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded inline-flex items-center">
                <i class="fas fa-cart-plus mr-2"></i>Add
            </button>
        </div>`
    ).join('');
    

    res.send(itemsHtml);
});


// Assuming the foodItems array and required modules are already defined
router.post('/', (req, res) => {
    const { name, price } = req.body;
    const newFoodItem = { id: foodItems.length + 1, name, price };
    foodItems.push(newFoodItem); // Add the new item to the array
    res.redirect('/api/food'); // Redirect to GET route to refresh the list
});

module.exports = router;
