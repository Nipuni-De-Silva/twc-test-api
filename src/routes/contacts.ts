import express, { Express, Request, Response, Router} from 'express';
const router: Router = express.Router();


// Contact List Page
router.get('/', (req: Request, res: Response) => {
    res.send('All contact details');
    
})

// Add Contact 
router.get('/new', (req: Request, res: Response) => {
    res.send('Add Contact Page');
})


// Edit contact details
router.patch('/edit', (req: Request, res: Response) => {
    res.send('Edit Contact Details');
})


// Delete Contact Details
router.delete('/delete', (req: Request, res: Response) => {
    res.send('Delete Contact Details');
})


module.exports = router;
