const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./client'));

const foodItemsRouter = require('./routes/foodItems.js');
app.use('/api/food', foodItemsRouter);

const cartRouter = require('./routes/cart.js');
app.use('/api/cart',cartRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
