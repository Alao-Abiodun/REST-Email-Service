import MailService from '../services/mail.services';


export default class SendMailController {
    private mailService: MailService;
    
    constructor() {
        this.mailService = new MailService();
    }

    async sendMail(req, res) {
        try {
            const { destinationEmail, sourceEmail, body, subject } = req.body;
            const data = { destinationEmail, sourceEmail, body, subject };
            await this.mailService.sendMail(data);
            return res.status(200).json({ message: 'Email Sent Successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}