import express, { Request, Response } from 'express';

const app = express();

// index route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome To Altmall Email Service with SOAP' });
});

// handle 404 errors`
app.use('*', (req: Request, res: Response, next) => {
    res.status(404).json({ message: 'Invalid Route' });
})

export default app;