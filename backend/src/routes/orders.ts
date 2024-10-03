const express = require('express');
const router = express.Router();
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

//route to create an order, used whenever a shoppingItem is purchased in the frontend
router.post('/', async (req: Request, res: Response) => {
    try {
        const { shopperId, items } = req.body; //frontend must send both a shopperId and items in the body

        const order = await prisma.order.create({
            data: {
                shopper: { connect: { id: shopperId } }, // Connect the shopper (user) to the order
                items: {
                    connect: items.map((item: { id: string }) => ({ id: item.id })) // iterates over all provided items via item ID and connects to each shoppingItem by their ID.
                }
            }
        });
        res.json(order);

    } catch (err) {
        res.json(err); 
    }
});


//returns all orders
router.get('/', async (req: Request, res: Response) => {
    try {
        const response = await prisma.order.findMany();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//
    //passed a 'userID' in the request parameters 
router.get('/:userID', async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            where: {shopperId: req.params.userID},
            include: { items: true }
        });

           // If no orders found...
           if (!orders.length) {
            return res.json({ message: "No orders found!" });
        }

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: "Order Fetching Error" });
    }
});


module.exports = {orderRouter: router};
