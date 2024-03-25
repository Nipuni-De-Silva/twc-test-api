import express, { Express, Request, Response, Application, Router, NextFunction } from 'express';
import addContact from '../../db/contact_operations/add';
const router: Router = express.Router();

// Register User (Post)
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Route: (Contacts/new)')
  const uid: string = req.uid as string
  try {
    await addContact(
        uid, 
        {
            fullName: req.body.fullName,
            gender: req.body.gender,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        }
    );
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)

  }
});

export default router