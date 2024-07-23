import type { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import fs from 'fs';
import { uploadToPinata } from '../../app/services/pinataService';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js's default body parser
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new multiparty.Form();

    form.parse(req, async (err: any, fields: any, files: { file: any[]; }) => {
        if (err) {
            return res.status(500).json({ message: 'Error parsing the files', err });
        }

        const file = files.file[0];
        const filePath = file.path;
        const fileStream = fs.createReadStream(filePath);
        const filename = file.originalFilename;
        const contentType = file.headers['content-type'];
        const title = fields.title[0];
        const description = fields.description[0];

        try {
            const pinataResponse = await uploadToPinata(fileStream, filename, contentType, title, description);
            res.status(200).json(pinataResponse);
        } catch (error) {
            res.status(500).json({ message: 'Error uploading to Pinata', error });
        } finally {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Failed to delete temporary file:', err);
            });
        }
        // TODO after uploading to Pinata, need to send it to the smart contract
    });
};

export default handler;
