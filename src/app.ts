import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';


const app:Application = express();
const port = process.env.PORT || 8000;

dotenv.config();

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World');
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

