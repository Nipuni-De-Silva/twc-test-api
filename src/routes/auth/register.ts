import express, { NextFunction, Request, Response, Router} from 'express';
import mongoose from 'mongoose';
import addUser from '../../db/user_operation/add'

// decode and encode jwt
import generateToken from '../../utils/jwt/encode';
// import verifyToken from '../../utils/jwt/decode';

const router: Router = express.Router();


// Register User (Post)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {

        // 1. generate token
        const token = generateToken({ email, password });

        // 2. save to mongodb
        const user = await addUser(email, password);
        // res.send("User created successfully!")


        // 3. res  with cookie+token
        addToken(token, res);

        // 4. redirect to home
        res.redirect('/');

        // res.send(token);
    } catch (e) {
        res.status(500);
        res.send('An error occurred while generating the token');
    }

})

function addToken(token: string, res: Response){
    res.cookie('token', token);
}

// router.get('/verify', (req: Request, res: Response) => {

//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.sendStatus(401);
//         }

//         const result = verifyToken(token);

//         res.send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error occurred while verifying the token');
//     }

// })



module.exports = router;
