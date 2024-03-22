import express, { Express, Request, Response, Application, Router, NextFunction } from 'express';
import updateContact from '../../db/contact_operations/update';
const router: Router = express.Router();

// Register User (Post)
router.patch('/', async (req: Request, res: Response, next: NextFunction) => {
  console.log('Route: (Contacts/edit)')
  const uid: string = req.query.uid as string
  const cid: string = req.query.cid as string
  try {
    await updateContact(
        uid, 
        cid, 
        {
            fullName: req.body.full_name,
            gender: req.body.gender,
            email: req.body.email,
            phoneNumber: req.body.phobe
        }
    );
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)

  }
});

export default router