import express, { NextFunction, Request, Response, Router} from 'express';
import { register } from 'module'
import addUser from '../../db/user_operation/add'
import checkUser from '../../db/user_operation/check'
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
                res.sendStatus(401);
            } else {
                // 3. generate token
                const token = generateToken({ email, password });

                // 4. save to mongodb
                const user = await addUser(email, password);
                // res.send("User created successfully!")

                // 5. res  with cookie+token
                res.cookie('token', token);

                // 6. redirect to home
                res.redirect('/');
                
            }
        } else {
            console.log('Invalid email');
            res.sendStatus(401);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }

})





module.exports = router;
