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

export const uploadToPinata = async (
    fileStream: fs.ReadStream,
    filename: string,
    contentType: string,
    name: string,
    description: string
): Promise<PinataResponse | null> => {
    try {
        // Step 1: Upload the file to IPFS
        const fileUrl = `${PINATA_BASE_URL}/pinning/pinFileToIPFS`;
        const fileData = new FormData();
        fileData.append('file', fileStream, { filename, contentType });

        const fileResponse = await axios.post(fileUrl, fileData, {
            maxBodyLength: Infinity, // This is needed to prevent axios from throwing an error due to large file size
            headers: {
                ...fileData.getHeaders(),
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_API_SECRET,
            },
        });

        const fileIpfsHash = fileResponse.data.IpfsHash;

        // Step 2: Upload the metadata to IPFS
        const metadataUrl = `${PINATA_BASE_URL}/pinning/pinJSONToIPFS`;
        const metadata = {
            name,
            description,
            image: `https://ipfs.io/ipfs/${fileIpfsHash}`,
            external_url: `https://ipfs.io/ipfs/${fileIpfsHash}`,
            attributes: [] // You can customize attributes as needed
        };

        const metadataResponse = await axios.post(metadataUrl, metadata, {
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_API_SECRET,
            },
        });
        console.log('medatata:', metadataResponse.data);

        return metadataResponse.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
