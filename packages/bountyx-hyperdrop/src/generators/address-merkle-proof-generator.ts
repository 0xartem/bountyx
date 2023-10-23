import fs from "fs"; // Filesystem
import path from "path"; // Path
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { logger } from "../utils/logger"; // Logging
import { getAddress, solidityPackedKeccak256 } from "ethers"; // TODO: update to ethersv6
import { BountyxMerkleLeafData } from "../types/bountyxmerkleleafdata";
import { IMerkleProofGenerator } from "./merkle-proof-generators";

// Output file path
const outputPath: string = path.join(__dirname, "../../data/merkle.json");

// Airdrop recipient addresses and scaled token values
export type HyperdropRecipient = {
    // Recipient address
    address: string;
    // Scaled-to-decimals token value
    // value: string;
  };

export default class AddressMerkleProofGenerator implements IMerkleProofGenerator {
  // Airdrop recipients
  recipients: HyperdropRecipient[] = [];

  /**
   * Setup generator
   * @param {number} decimals of token
   * @param {Record<string, number>} airdrop address to token claim mapping
   */
  constructor(hyperdrop: HyperdropRecipient[]) {
    //TODO: implement validation
    this.recipients = hyperdrop;
  }

  /**
   * Generate Merkle Tree leaf from address and value
   * @param {string} address of airdrop claimee
   * @param {string} value of airdrop tokens to claimee
   * @returns {Buffer} Merkle Tree node
   */
  generateLeaf(hyperdropLeaf: HyperdropRecipient): Buffer {
    return Buffer.from(
      // Hash in appropriate Merkle format
      solidityPackedKeccak256(
        ["address"],
        [
          hyperdropLeaf.address,
        ]
      ).slice(2),
      "hex"
    );
  }

  async process(): Promise<void> {
    logger.info("Generating simple address Merkle tree.");

    // Generate merkle tree
    const merkleTree = new MerkleTree(
      // Generate leafs
      this.recipients.map((leafData) =>
        this.generateLeaf(leafData)
      ),
      // Hashing function
      keccak256,
      { sortPairs: true }
    );

    // Collect and log merkle root
    const merkleRoot: string = merkleTree.getHexRoot();
    logger.info(`Generated Merkle root: ${merkleRoot}`);

    // Collect and save merkle tree + root
    await fs.writeFileSync(
      // Output to merkle.json
      outputPath,
      // Root + full tree
      JSON.stringify({
        root: merkleRoot,
        tree: merkleTree
      })
    );
    logger.info("Generated merkle tree and root saved to Merkle.json.");
  }
}
