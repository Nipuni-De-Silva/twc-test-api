import express, { Express, Request, Response, Router} from 'express';
import addContact from '../db/contact_operations/add';
import getContacts from '../db/contact_operations/get'
import deleteContact from '../db/contact_operations/delete'
import updateContact from '../db/contact_operations/update'

const router: Router = express.Router();


// Contact List Page
router.get('/', async (req: Request, res: Response) => {
    const uid: string = req.query.uid as string;
    let result = await getContacts(uid);
    res.send(result);
})

// Add Contact 
router.get('/new', async (req: Request, res: Response) => {
    let userId: string = req.query.uid as string;
    //addContact(userId, contactDetails);
    await addContact(
        userId, 
        {
        fullName: req.body.fullName as string,
        gender: req.body.gender as string,
        phoneNumber: req.body.phoneNumber as string,
        email: req.body.email as string
    })
    res.send('New Contact added')
})


// Edit contact details
router.patch('/edit', async (req: Request, res: Response) => {
    const uid: string = req.body.uid as string
    const cid: string = req.body.cid as string
    await updateContact(
        uid,
        cid,
        {
        fullName: req.body.fullName as string,
        gender: req.body.gender as string,
        phoneNumber: req.body.phoneNumber as string,
        email: req.body.email as string

        }
    );
  res.send('Update contact')
})


// Delete Contact Details
router.delete('/delete',async (req: Request, res: Response) => {
    const uid: string = req.body.uid;
    const cid: string = req.body.cid;

    await deleteContact(
        uid, cid
    )
    res.send('Contact Deleted!')
})


module.exports = router;
