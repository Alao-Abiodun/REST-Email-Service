import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const { STERLING_MAIL } = process.env;

export interface EmailOptions {
    sourceEmail: string;
    destinationEmail: string;
    subject: string;
    body: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        await axios.post(String(STERLING_MAIL), options);
    } catch (err) {
        throw new Error(err);
    }
};

