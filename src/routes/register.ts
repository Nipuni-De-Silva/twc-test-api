import express, { Request, Response, Router} from 'express';

// decode and encode jwt
import generateToken from '../jwt/encode';
import verifyToken from '../jwt/decode';

const router: Router = express.Router();


// Registration Page 
router.get('/', (req: Request, res: Response) => {
    // res.send('Registration Page');

    try{
        const token = generateToken({ email: "nipuni20ch@getMaxListeners.com", password: "12345"});

            
        // set token in cookie
        res.cookie('jwt', token, { httpOnly: true });

        // res.send(token);
        res.send(token);
    }catch(err){
        console.error(err);
        res.status(500).send('An error occured while generating the token')
    }

})

router.get('/verify', (req: Request, res: Response) => {

    try{
        // const authHeader = req.headers['authorization'];
    
        // access the token from the cookie
        const token = req.cookies.jwt;

        if(!token) {
            return res.sendStatus(401);
        }

        const result = verifyToken(token);

        res.send(result);
    } catch(err){
        console.error(err);
        res.send(500).send('Error oocured while verifying the token')
    }

})

// Handle registration - Post
router.post('/', (req: Request, res: Response) => {
    res.send('Registration Data Submission');
})

module.exports = router;
