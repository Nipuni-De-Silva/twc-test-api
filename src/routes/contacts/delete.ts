import express, { Express, Request, Response, Application, Router, NextFunction } from 'express';
import deleteContact from '../../db/contact_operations/delete';
const router: Router = express.Router();

// Register User (Post)
router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Route: (Contacts/delete)')
  const uid: string = req.query.uid as string
  const cid: string = req.query.cid as string
  try {
    const contactList = await deleteContact(uid, cid)
    res.send(contactList)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)

  }
});

export default router