import {
  sporeABI,
  paradABI,
  sporeAddress,
  coreConfig,
  paradAddress,
} from "@/utils/blockchain/blockchainData";
import { readContract, readContracts } from "@wagmi/core";
import {
  IDebatesData,
  IMetadata,
  ITopicData, ITopicMetadata,
  ITopicsData,
} from "@/interfaces/debates.interface";
import {
  convertBigIntArrayToNumber,
  convertEnumToString,
} from "@/utils/converter";
import { title } from "process";
import fetchFromIPFS from "@/utils/blockchain/fetchFromIPFS";
import fetchTopicMetadataFromIPFS from "@/utils/blockchain/fetchFromIPFS";

const contract = {
  address: sporeAddress,
  abi: sporeABI,
};

const fetchUri = async (
  uri: string | undefined
): Promise<IMetadata | undefined> => {
  if (!uri) {
    return;
  }
  try {
    const response = await fetch(uri);
    const result = await response.json();

    return result as IMetadata;
  } catch (error) {
    throw new Error("Failed to fetch uri:" + error || "Unknown error");
  }
};

const getTopicList = async (): Promise<bigint[]> => {
  try {
    const result = await readContract(coreConfig, {
      ...contract,
      functionName: "readGroupIdKeys",
    });

    return result as bigint[];
  } catch (error) {
    throw new Error("Failed to get topics:" + error || "Unknown error");
  }
};

const getBulkIsHotForGroups = async (): Promise<bigint[]> => {
  try {
    const result = await readContract(coreConfig, {
      ...contract,
      functionName: "getBulkIsHotForGroups",
    });

    return result as bigint[];
  } catch (error) {
    throw new Error("Failed to get topics:" + error || "Unknown error");
  }
}

const getUriForDispute = async (
  topicId: number | string,
  debateId: number | string
): Promise<{
  uri: string | undefined;
  metadata: IMetadata | undefined;
}> => {
  try {
    const uri = await readContract(coreConfig, {
      ...contract,
      functionName: "getUriForDispute",
      args: [topicId, debateId],
    });

    const metadata = await fetchUri(uri as string);

    return { uri: uri as string | undefined, metadata };
  } catch (error) {
    throw new Error(
      "Failed to get uri for dispute:" + error || "Unknown error"
    );
  }
};


const getDisputesByTopicId = async (topicID: number): Promise<ITopicData> => {
  try {
    const rawResult = await readContract(coreConfig, {
      ...contract,
      functionName: "getDisputes",
      args: [topicID],
    });

    const topicURI = await readContract(coreConfig, {
      ...contract,
      functionName: "groupIdURIs",
      args: [topicID]
    });

    /* @ts-ignore */
    const metadataURI = await fetchTopicMetadataFromIPFS(topicURI.result as string)

    const topicParticipants = await readContract(coreConfig, {
      ...contract,
      functionName: "getParticipantsInGroup",
      args: [topicID]
    });


    const result: ITopicData = {
      topic: {
        id: topicID,
        participantsCount: Number(topicParticipants),
        image: metadataURI?.image || "",
        title: metadataURI?.name || "No title provided",
        debates: (rawResult as any).map(async(debate: any, index: number) => {
          const {uri, metadata} = await getUriForDispute(
              topicID,
              index
          );
          return {
            id: index + 1,
            status: convertEnumToString(debate.status),
            isHot: debate.isHot,
            point: debate.point,
            members: Number(debate.members),
            memberShares: convertBigIntArrayToNumber(debate.memberShares),
            memberChoices: convertBigIntArrayToNumber(debate.memberChoices),
            qtyMembers: Number(debate.qtyMembers),
            needQtyMembers: Number(debate.needQtyMembers),
            qtyAnswers: Number(debate.qtyAnswers),
            pointScores: convertBigIntArrayToNumber(debate.pointScores),
            prizePool: Number(debate.prizePool),
            nftUris: debate.nftUris,
            uri,
            metadata,
          }
        })
      }
    }


    return result;
  } catch (error) {
    throw new Error("Failed to get disputes:" + error || "Unknown error");
  }
};

const getDisputesByTopicList = async (
  topicList: number[] | bigint[]
): Promise<ITopicsData> => {
  try {
    const rawResult = await readContracts(coreConfig, {
      contracts: topicList.map((topicId) => ({
        ...contract,
        functionName: "getDisputes",
        args: [topicId],
        topicId,
      })),
    });

    const topicsURIs = await readContracts(coreConfig, {
      contracts: topicList.map((topicId) => ({
        ...contract,
        functionName: "groupIdURIs",
        args: [topicId],
        topicId,
      })),
    });


    // Fetched image and title from IPFS
    const metadataURIs = await Promise.all(topicsURIs.map(async i => await fetchTopicMetadataFromIPFS(i.result as string)))

    const topicsParticipants = await readContracts(coreConfig, {
      contracts: topicList.map((topicId) => ({
        ...contract,
        functionName: "getParticipantsInGroup",
        args: [topicId],
        topicId,
      })),
    });

    //console.log(topicsImages, topicsParticipants);

    const result: ITopicsData = {
      topics: await Promise.all(
        rawResult.map(async (item: any, topicIndex: number) => ({
          id: topicIndex + 1,
          title: metadataURIs[topicIndex]?.name || "No title provided",
          image: metadataURIs[topicIndex]?.image || "",
          participantsCount: Number(topicsParticipants[topicIndex].result),
          debates: await Promise.all(
            item.result.map(async (debate: any, debateIndex: number) => {
              const { uri, metadata } = await getUriForDispute(
                topicIndex + 1,
                debateIndex
              );
              return {
                id: debateIndex + 1,
                status: convertEnumToString(debate.status),
                isHot: debate.isHot,
                point: debate.point,
                members: Number(debate.members),
                memberShares: convertBigIntArrayToNumber(debate.memberShares),
                memberChoices: convertBigIntArrayToNumber(debate.memberChoices),
                qtyMembers: Number(debate.qtyMembers),
                needQtyMembers: Number(debate.needQtyMembers),
                qtyAnswers: Number(debate.qtyAnswers),
                pointScores: convertBigIntArrayToNumber(debate.pointScores),
                prizePool: Number(debate.prizePool),
                nftUris: debate.nftUris,
                uri,
                metadata,
              };
            })
          ),
        }))
      ),
    };

    return result;
  } catch (error) {
    throw new Error(
      "Failed to get disputes by topic list:" + error || "Unknown error"
    );
  }
};

const getDecimalsOfToken = async (address: `0x${string}`): Promise<number> => {
  try {
    const result = await readContract(coreConfig, {
      address,
      abi: paradABI,
      functionName: "decimals",
    });

    return result as number;
  } catch (error) {
    throw new Error(
      "Failed to get decimals of token:" + error || "Unknown error"
    );
  }
};

export const blockchainService = {
  async getTopics(): Promise<ITopicsData> {
    try {
      const topicList = await getTopicList();
      const debates = await getDisputesByTopicList(topicList);

      return debates;
    } catch (error) {
      console.log(error)
      throw new Error();
    }
  },
  async getDecimalsOfToken(address: `0x${string}`): Promise<number> {
    try {
      return await getDecimalsOfToken(address);
    } catch (error) {
      throw new Error();
    }
  },
  async getDecimalsOfPARAD(): Promise<number> {
    try {
      return await getDecimalsOfToken(paradAddress);
    } catch (error) {
      throw new Error();
    }
  },
};
