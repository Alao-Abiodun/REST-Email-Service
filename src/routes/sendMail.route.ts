import { sendMail } from '../controllers/sendMail.controller';
import { Router } from 'express';


export default (router: Router) => {

    router.post('/send-mail', sendMail)
}