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
  "0x332a21599592e64146B1f6Bf055b933f20fB2b93";
const sporeNFTAddress: `0x${string}` =
  "0x23A635C4b25604302d6640551C5c3A9D828aAcC9";
const paradAddress: `0x${string}` =
  "0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C";


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
