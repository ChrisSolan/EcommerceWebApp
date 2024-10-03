const express = require('express');
const router = express.Router();
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
//const { verifyToken } = require('./users.js');

//route to create a shopping item, add verifyToken to the parameters later
router.post('/', async (req: Request, res: Response) => {
    try {
        const shoppingItem = await prisma.shoppingItem.create({
            data: req.body
        });
        res.json(shoppingItem);
    } catch (err) {
        res.json(err); 
    }
});

//returns all foodItems
router.get('/', async (req: Request, res: Response) => {
    try {
        const response = await prisma.shoppingItem.findMany();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//route to add a shopping item to your shopping cart //add verifyToken back to the parameters
    //Needs a shoppingItemID and userID in the request body
    /*
router.put('/', async (req: Request, res: Response) => {
    try {
        const item = await prisma.shoppingItem.findUnique({
            where: { id: req.body.shoppingItemID }
        });

        const user = await prisma.user.update({
            where: { id: req.body.userID },
            data: { orders: item} //make a shopping cart field in the schema, that holds many shoppingItems like an Order table, but not a table
        });

        //user.createdFoodItems.push(foodItem.id);

        //res.json({ orders: user.orders });

    } catch (err) {
        res.json(err); 
    }
});
*/

module.exports = {shoppingItemsRouter: router};
