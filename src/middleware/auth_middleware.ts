import express, { Express, Request, Response, Application, Router, NextFunction } from 'express';
import verifyToken from '../utils/jwt/decode';
import getUser from '../db/user_operation/get';
import { JwtPayload} from 'jsonwebtoken';

declare module "express-serve-static-core" {
    interface Request {
        uid? : string;
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('authMiddkeware Started ::');
    const path = req.path as string;

    // This also help to avoid redirect
    if(path == './login' || path == '/register' || path == '/logout'){
        next();
    } else {
        //console.log(req.cookies)
        const token: string = req.cookies.token;
        if(token) {
            try {
                const result = verifyToken(token) as JwtPayload;
                // result ex: {email: 'nipuni123', password: '11', iat: 1711019248}
                //console.log(result.email)
                const email: string = result.email;
                const password: string = result.password;
                
                try {
                    // 1. get uid from db
                    const uid: string = await getUser(email, password);

                    // 2. add that uid to req
                    req.uid = uid;

                    // 3. call next()
                    next();

                } catch (e){
                    console.log('DB get user id error');
                    res.redirect('/logout');
                }
            } catch (e) {
                console.log('Token verification failed error');
                res.redirect('/logout')
            }
        } else {
            console.log('Token is empty');
            // If token is empty
            res.redirect('/login');
        }
    }
    console.log('authMiddleware Ended ::')
}

export default authMiddleware;



