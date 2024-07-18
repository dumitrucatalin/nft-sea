import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// TODO: set them inside the .env file
const PINATA_API_KEY = process.env.PINATA_API_KEY!;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET!;
const PINATA_BASE_URL = 'https://api.pinata.cloud';

interface PinataResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
}

export const uploadToPinata = async (fileStream: fs.ReadStream, filename: string, contentType: string): Promise<PinataResponse | null> => {
    const url = `${PINATA_BASE_URL}/pinning/pinFileToIPFS`;

    try {
        const data = new FormData();
        data.append('file', fileStream, { filename, contentType });

        const response = await axios.post(url, data, {
            maxBodyLength: Infinity, // This is needed to prevent axios from throwing an error due to large file size
            headers: {
                ...data.getHeaders(),
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_API_SECRET,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
