import MailService from '../services/mail.services';
import { producer } from '../config/kafka.config';
import { EmailOptions } from '../types/sendMail.types';


export default class SendMailController {
    private mailService: MailService;

    constructor() {
        this.mailService = new MailService();
    }

    async sendMail(req, res) {
        try {
            const { destinationEmail, sourceEmail, body, subject } = req.body as EmailOptions;

            const data = { destinationEmail, sourceEmail, body, subject };

            // connect to kafka to producer
            await producer.connect();

            await Promise.all([
                producer.send({
                    topic: String(process.env.KAFKA_TOPIC),
                    messages: [{ 
                        key: process.env.KAFKA_MESSAGE_KEY, 
                        value: JSON.stringify({...req.body, action: 'SEND_MAIL'}) 
                    }]
                }),
    
                this.mailService.sendMail(data)
            ])

            return res.status(200).json({ message: 'Email Sent Successfully' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}