import express, { Request, Response, Router} from 'express';
const router: Router = express.Router();

// Welcome page
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome - TWC Contact Portals');
})

module.exports = router;

