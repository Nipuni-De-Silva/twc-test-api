import express, { NextFunction, Request, Response, Router} from 'express';
import getContacts from '../db/contact_operations/get';

const router: Router = express.Router();


// Home page
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log('Route: (/ | Home)')
    // home (redirect) -> welcome or contacts
    // welcome - if contacts = 0
    // contacts - if contacts > 0

    const contactLists = await getContacts(req.query.uid as string)
    if( contactLists.length > 0){
        res.redirect('/contacts');
    } else {
        res.redirect('/welcome');
    }
})


module.exports = router;

