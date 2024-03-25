import express, { NextFunction, Request, Response, Router} from 'express';
import { register } from 'module'
import addUser from '../../db/user_operations/add'
import checkUser from '../../db/user_operations/check'
import generateToken from '../../utils/jwt/encode';
import validator from 'validator';
import mongoose from 'mongoose';

const router: Router = express.Router();


// Register User (Post)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Route: (Register)')
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        // 1. validate user input
        const isValidated: boolean = validator.isEmail(email);
        if(isValidated) {
            // 2. check if user already registered
            const userStatus = await checkUser(email);
            if (userStatus === 'Found'){
                console.log('User already registered')
                res.status(401).json({ message: 'User already registered' });
            } else {
                // 3. generate token
                const token = generateToken({ email, password });

                // 4. save to mongodb
                await addUser(email, password);

                // 5. Send token
                res.json({ token: token });
                
            }
        } else {
            // If invalidated
            console.log('Invalidate Email')
            res.status(401).json({ message: 'Invalide Email addrress' });
        }
    } catch (e) {
        console.error(e);
        //db access failed
        console.log('Internal Server Error (db access fail')
        res.status(500).json({ message: 'Internal Server Error' });
    }

})


export default router;

