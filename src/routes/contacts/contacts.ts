import express, { Express, Request, Response, Application, Router, NextFunction } from 'express';
import getContacts from '../../db/contact_operations/get';
const router: Router = express.Router();

// Register User (Post)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Route: (Contacts)')
  const uid: string = req.uid as string
  try {
    const contactList = await getContacts(uid)
    res.send(contactList)
  } catch (e) {
    res.status(401).json({ message: (e as Error).message });
  }
});

export default router