import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// import routes
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/auth/login');
const logoutRouter = require('./routes/auth/logout');
const registerRouter = require('./routes/auth/register');
const contactRouter = require('./routes/contacts');
import deleteContactRouter from './routes/contacts/delete';
import newContactRouter from './routes/contacts/new';
import editContactRouter from './routes/contacts/edit';

import authMiddleware from './middleware/auth_middleware';

const app:Application = express();
const port = process.env.PORT || 8000;


var cookieParser = require('cookie-parser');


app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World');
})

mongoose.connect('mongodb+srv://my123flutter:uQy7uEyxD9vjQvc@cluster0.2jg3vxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/contacts', contactRouter);
app.use('/contacts/new', newContactRouter);
app.use('/contacts/edit', editContactRouter);
app.use('/contacts/delete', deleteContactRouter);

