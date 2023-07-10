import sendMailRoutes from './sendMail.route';
import { Router } from 'express';

const router = Router();

sendMailRoutes(router);

export default router;