import { Request, Response } from 'express';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORTNumber || 3010;
const path = require('path');
const { userRouter } = require('./routes/users.ts');
const { shoppingItemsRouter } = require('./routes/shoppingItems.ts');
const { orderRouter } = require('./routes/orders.ts');

app.use(express.json()); //converts data from the Frontend to JSON for the server to understand it
app.use(cors()); //allows for API requests from the frontend
app.use('/auth', userRouter);
app.use('/shoppingItems', shoppingItemsRouter);
app.use('/orders', orderRouter);

app.use(express.static(path.join(__dirname, '..', 'public'))); //Serves the static files provided from the build version of the React frontend
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
}); 

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: "Hello World!"});
});

app.listen(port, () => console.log(`SERVER STARTED at ${port}!`));

module.exports = app;