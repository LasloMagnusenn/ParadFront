import {ITopicMetadata} from "@/interfaces/debates.interface";

export default async function fetchTopicMetadataFromIPFS(uri: string): Promise<ITopicMetadata | undefined> {
    try {
        const response = await fetch(uri);
        return await response.json();
    } catch (error) {
        console.log("Can not fetch from IPFS:", error);
    }
}