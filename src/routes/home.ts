import express, { NextFunction, Request, Response, Router} from 'express';
var cookieParser = require('cookie-parser');


const router: Router = express.Router();
router.use(cookieParser());

// Welcome page
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    // save cookie from response object after initial request to the server
    res.cookie('name', "Nipuni", {maxAge: 30000});
    res.send('Welcome - TWC Contact Portals');
})

router.get('/home', (req: Request, res: Response, next: NextFunction) => {
    
    res.send(req.cookies.name)
})

module.exports = router;

