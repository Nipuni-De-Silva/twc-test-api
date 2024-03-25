import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// import routes
import loginRouter from './routes/auth/login';
import registerRouter from './routes/auth/register';
import contactsRouter from './routes/contacts/contacts';
import deleteContactRouter from './routes/contacts/delete';
import newContactRouter from './routes/contacts/new';
import editContactRouter from './routes/contacts/edit';

import authMiddleware from './middleware/auth_middleware';

const app:Application = express();
const port = 8000;


var cookieParser = require('cookie-parser');


app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World');
})

mongoose.connect('mongodb+srv://nipuni20ch:twc123@twcdb.eqi3dcc.mongodb.net/?retryWrites=true&w=majority&appName=TWCdb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);

// Routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/contacts', contactsRouter);
app.use('/contacts/new', newContactRouter);
app.use('/contacts/edit', editContactRouter);
app.use('/contacts/delete', deleteContactRouter);

