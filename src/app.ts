import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';


// import routes
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const contactsRouter = require('./routes/contacts');


const app:Application = express();
const port = process.env.PORT || 8000;

var cookieParser = require('cookie-parser');
app.use(cookieParser());

dotenv.config();

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World');
})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

// Add routes
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/contacts', contactsRouter);