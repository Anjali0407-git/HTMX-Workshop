const express = require('express');
const router = express.Router();
const { foodItems } = require('../data/foodItems');

let cart = [];

router.post('/add-to-cart', (req, res) => {
    console.log(req.body.id)
    const itemId = parseInt(req.body.id);
    const item = foodItems.find(item => item.id === itemId);
    cart.push(item);
    console.log(cart)

    const totalCost = cart.reduce((acc, curr) => acc + curr.price, 0);

    res.send(`<li>${item.name} - $${item.price}</li> Total in Cart: $${totalCost}`);
});

module.exports = router;
