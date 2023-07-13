import express, { Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes/index.route';


const app = express();

// leverage the access to get the json value
app.use(express.json());
app.use(morgan('combined'))

//mount route
app.use('/api/v1', routes)

// index route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome To Altmall Email Service with SOAP' });
});

// handle 404 errors`
app.use('*', (req: Request, res: Response, next) => {
    res.status(404).json({ message: 'Invalid Route' });
})

export default app;