import express, { Express, Request, Response, Application, NextFunction } from 'express';
import verifyToken from '../utils/jwt/decode';
import getUser from '../db/user_operations/get';
import { JwtPayload } from 'jsonwebtoken';

declare module "express-serve-static-core" {
    interface Request {
        uid?: string;
    }
}

const authMiddleware = async function (req: Request, res: Response, next: NextFunction) {

    const path = req.path as string;
    //console.log('path:' + path);

    // This also help to avoid redirect cycle
    if (path == '/login' || path == '/register' || path == '/logout') {
        next();
    } else {
        //console.log(req.cookies)
        console.log('authMiddleware Started (else part) ::')

        if (true) {
            //const authHeader = req.get('authorization');
            const authHeader = req.headers['authorization']
            console.log(`Auth Header: ${authHeader}`)
            const token = authHeader && authHeader.split(' ')[1]
            console.log(`Token from Client: ${token}`)
            if (token) {
                try {
                    const result = verifyToken(token) as JwtPayload;
                    // result ex: { email: 'eee', password: 'pass', iat: 1711019248 }
                    //console.log(result.email)
                    const email: string = result.email;
                    const password: string = result.password
                    try {
                        // 1. get uid from db
                        const uid: string = await getUser(email, password)
                        // 2. add that uid to req
                        req.uid = uid;
                        // 3. call next()
                        next();
                    } catch (e) {
                        console.log('DB get user (id) error')
                        res.status(401).json({ message: (e as Error).message });
                    }
                } catch (e) {
                    // If token verification failed
                    // logout will clear cookies(clear unverified token)
                    console.log('Toekn verification failed error')
                    res.status(401).json({ message: (e as Error).message });
                }
            } else {
                console.log('No token found')
                // If token is empty
                res.status(401).json({ message: "No token found" });
            }
        } else {
            console.log('Auth header missing')
            // If token is empty
            res.status(401).json({ message: 'Auth header missing' });
        }

    }
    console.log('authMiddleware Ended ::')


}

export default authMiddleware