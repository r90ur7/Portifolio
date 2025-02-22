import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next/types';
import Email from '../teste/Email';

const resend = new Resend('re_KrmGciog_7P2aFvkRc4DwHjf3XUFdCqka');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'rallenson900@gmail.com',
            subject: `Nova mensagem de ${name}`,
            react: Email({
                name,
                email,
                message
            })
        });

        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}