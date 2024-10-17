const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwtToken = process.env.JWT_SECRET;
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
const prisma = new PrismaClient();

router.post('/register', async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.user.findUnique({ where: {username} }); //returns a value if the username is found

        //if the user already exists, reply with the message below
        if (user) { return res.status(400).json({message: "User Alredy Exists!"}); }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "User Registered!", user: newUser });

    } catch(err) {
        console.log(err);
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const {username, password} = req.body;

    try {

        const user = await prisma.user.findUnique({ where: {username} }); 

        //if the user doesn't exist, reply with the message below
        if (!user) { return res.status(404).json({message: "User Doesn't Exist!"}); }

        const isPasswordValid = await bcrypt.compare(password, user.password); //compares the hashed password of an established user to the password we are inputing for login
        if (!isPasswordValid) {
            return res.status(401).json({message: "Username or Password Is Incorrect!"});
        }

        //Use an ENV variable for the secret, because it will be used to verifiy if the token is the same across sessions
        const token = jwt.sign({id: user.id}, jwtToken); //the secret was replaced with the ENV that we stored the secret in for extra security

        res.status(200).json({token: token, userID: user.id});


    } catch (err) {
        console.log(err);
    }
});

router.delete('/:userID', async(req: Request, res: Response) => {
    try {
        const {userID} = req.params;
        const response = await prisma.user.delete({
            where: {
                id: userID
            }
        });
        if (!response) { return res.status(404).json({ message: "User NOT FOUND!" }); }
        res.json(response);
    } catch (err) {
        res.json(err);
    }




});

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtToken, (err: Error) => {
            if (err) return res.sendStatus(403); //user is NOT verified
            next();
        });
    } else { res.sendStatus(401); } //no token to verify, user is NOT verified
}

module.exports = {userRouter: router, verifyToken: verifyToken};