import express, { Request, Response, Router} from 'express';
const router: Router = express.Router();


// Login Page
router.get('/', (req: Request, res: Response) => {
    res.send('Login Page');
})


module.exports = router;