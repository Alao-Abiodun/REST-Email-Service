import SendMailController from '../controllers/sendMail.controller';
import { Router } from 'express';

const { sendMail } = new SendMailController();

export default (router: Router) => {

    router.post('/send-mail', sendMail)
}