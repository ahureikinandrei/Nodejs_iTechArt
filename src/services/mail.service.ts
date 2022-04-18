import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import {
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USER,
} from '../../config/constants';

// type TransorterType = {
//     host: string;
//     port: string;
//     secure: boolean;
//     auth: { user: string | undefined; pass: string | undefined };
// };

class MailService {
    private transporter: Transporter;

    constructor() {
        const PORT = SMTP_PORT ? +SMTP_PORT : 587;
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST || 'smtp.ethereal.email',
            port: PORT,
            secure: false,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
        });
    }

    async send(): Promise<string> {
        const pdfPath = path.join(
            __dirname,
            '..',
            '..',
            'static',
            'pdf',
            'basics.pdf'
        );
        const status = await this.transporter.sendMail({
            from: SMTP_USER,
            to: 'andromnir1993@gmail.com',
            subject: 'authentication test',
            text: 'Hello world?',
            html: '<b>Hello world?</b>',
            attachments: [
                {
                    filename: 'Form.pdf',
                    content: fs.createReadStream(pdfPath),
                },
            ],
        });
        const [recipientMail] = status.accepted;

        return recipientMail;
    }
}

export default new MailService();
