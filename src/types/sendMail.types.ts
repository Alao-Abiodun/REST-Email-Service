import axios from 'axios';

const { STERLING_MAIL, ACTIVE_DIRECTORY_URL } = process.env;

export interface EmailOptions {
    sourceEmail: string;
    destinationEmail: string;
    subject: string;
    body: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        await axios.post(String(ACTIVE_DIRECTORY_URL), options);
    } catch (err) {
        throw new Error(err);
    }
};

