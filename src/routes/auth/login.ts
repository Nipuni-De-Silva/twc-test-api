import express, { NextFunction, Request, Response, Router} from 'express';
import generateToken from '../../utils/jwt/encode';
import addUser from '../../db/user_operations/add';
import getUser from '../../db/user_operations/get';
import checkUser from '../../db/user_operations/check';

import validator from 'validator';
const router: Router = express.Router();




// Login Page
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Route: (Log-in)')
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        // 1. get user
        await getUser(email, password);

        // 2. generate token
        const token = generateToken({ email, password });

        // 3. res with cookie + token
        // res.cookie('token', token)

        // 3. send to client for storing in local storage
        //res.header('Authorization', `Bearer ${token}`);
    res.json({ token: token });
    } catch (e) {
        res.sendStatus(401).json({ message: 'Invalid credentials' });
    }
})


export default router;