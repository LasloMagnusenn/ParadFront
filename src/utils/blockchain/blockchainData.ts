import sporeABIjson from "./sporeABI.json";
import sporeNFTABIjson from "./sporeNFTABI.json";
import paradABIjson from "./paradABI.json";
import { coreConfig } from "./coreConfig";
import { config } from "./config";
import { Abi } from "viem";

const sporeABI: Abi = sporeABIjson as Abi;
const sporeNFTABI: Abi = sporeNFTABIjson as Abi;
const paradABI: Abi = paradABIjson as Abi;


const sporeAddress: `0x${string}` =
  "0x5b50F68F2b148C0653B7be116A9Aa6d62A29eA39";
const sporeNFTAddress: `0x${string}` =
  "0xCB1a6A3CEfB8631b0517D6A3d179110118eC1f70";
const paradAddress: `0x${string}` =
  "0xaeA3e77A6503260943788068A59A052c9cbdE014";

export {
  sporeABI,
  sporeNFTABI,
  paradABI,
  sporeAddress,
  sporeNFTAddress,
  paradAddress,
  config,
  coreConfig,
};
