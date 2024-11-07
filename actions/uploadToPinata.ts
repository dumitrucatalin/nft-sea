"use server";
import axios from 'axios';

// Ensure these are set in the .env file
const PINATA_API_KEY = process.env.PINATA_API_KEY!;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET!;
const PINATA_BASE_URL = 'https://api.pinata.cloud';

interface PinataResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
}

export const uploadToPinata = async (form: FormData): Promise<PinataResponse | null> => {
    try {
        console.log('Uploading to Pinata...');
        // Extract file and metadata fields from FormData
        const file = form.get('file') as Blob | null;
        const title = form.get('title') as string | null;
        const description = form.get('description') as string | null;

        if (!file || !title || !description) {
            console.error('Missing required form data fields.');
            return null;
        }

        // Step 1: Create a new FormData object to upload to Pinata
        const fileData = new FormData();

        // Append the file without additional options
        fileData.append('file', file);

        // Upload the file to IPFS
        const fileResponse = await axios.post(`${PINATA_BASE_URL}/pinning/pinFileToIPFS`, fileData, {
            maxBodyLength: Infinity,
            headers: {
                // ...fileData.getHeaders(),
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_API_SECRET,
            },
        });

        const fileIpfsHash = fileResponse.data.IpfsHash;

        // Step 2: Upload the metadata to IPFS
        const metadata = {
            name: title,
            description,
            image: `https://ipfs.io/ipfs/${fileIpfsHash}`,
            external_url: `https://ipfs.io/ipfs/${fileIpfsHash}`,
            attributes: [], // Customize as needed
        };

        const metadataResponse = await axios.post(`${PINATA_BASE_URL}/pinning/pinJSONToIPFS`, metadata, {
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_API_SECRET,
            },
        });

        console.log('Metadata uploaded:', metadataResponse.data);
        return metadataResponse.data;
    } catch (error) {
        console.error('Pinata upload error:', error);
        return null;
    }
};