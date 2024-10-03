const express = require('express');
const router = express.Router();
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { connect } from 'http2';
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
    
router.put('/cart', async (req: Request, res: Response) => {
    try {
        const {userID, shoppingItemID} = req.body;

        const item = await prisma.shoppingItem.findUnique({
            where: { id: shoppingItemID }
        });

        if (!item) { return res.status(400).json({ message: "Shopping item NOT FOUND!" }); }

        //adds the shopping item to the user's shopping cart
        const user = await prisma.user.update({
            where: { id: userID },
            data: { 
                shoppingCart: {
                    connect: { id: shoppingItemID } //connect to a shoppingItem via their ID to add to the shopping cart
                }
            },
            include: { shoppingCart: true} // Return the updated cart with the response
        });

        if(!user) { return res.status(400).json({ message: "User NOT FOUND!" }); }

        res.json(user.shoppingCart);

    } catch (err) {
        res.json(err); 
    }
});


module.exports = {shoppingItemsRouter: router};
