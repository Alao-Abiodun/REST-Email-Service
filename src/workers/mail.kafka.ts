import { consumer } from '../config/kafka.config';
import { mailService } from '../services/mail.services';
import dotenv from 'dotenv';
dotenv.config();

export default {
    async start() {
        // consume the message
        await consumer.connect();
        await consumer.subscribe({ topic: String(process.env.KAFKA_TOPIC) });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Processing message from topic ${topic}`)
                const data = JSON.parse(String(message.value));    
                console.log("data: ", data);   
                if (data.action === 'SEND_MAIL') {
                    mailService(data);
                }
            },
          })
    }
}