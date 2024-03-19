import express, { Request, Response, Router} from 'express';
const router: Router = express.Router();


// Registration Page 
router.get('/', (req: Request, res: Response) => {
    res.send('Registration Page');
})

// Handle registration - Post
router.post('/', (req: Request, res: Response) => {
    res.send('Registration Data Submission');
})

module.exports = router;
