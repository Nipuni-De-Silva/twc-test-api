import express, { Request, Response, Router} from 'express';
import generateToken from '../../utils/jwt/encode';
import addUser from '../../db/user_operation/add';
import getUser from '../../db/user_operation/get';
import checkUser from '../../db/user_operation/check';

import validator from 'validator';
const router: Router = express.Router();




// Login Page
router.get('/', async (req: Request, res: Response) => {
    console.log('Route: (Login)')
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        // 1. get user
        await getUser(email, password);

        // 2. generate token
        const token = generateToken({ email, password });

        // 3. res with cookie+token
        res.cookie('token', token);

        // 4. redirect to home
        res.redirect('/');
    } catch (e) {
        res.sendStatus(401);
    }
})


module.exports = router;