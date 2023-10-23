import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import { logger } from "./utils/logger"; // Logging
import { BountyxMerkleLeafData } from "./types/bountyxmerkleleafdata";
import { getHyperdropLeavesData } from "./leaves-data/config-generator";
import BountyxMerkleProofGenerator from "./generators/bountyx-merkle-proof-generator";

// Config file path
const configPath: string = path.join(__dirname, "../data/bountyx-config.json");

/**
 * Throws error and exists process
 * @param {string} erorr to log
 */
function throwErrorAndExit(error: string): void {
  logger.error(error);
  process.exit(1);
}

(async () => {
  const merkleLeaves: BountyxMerkleLeafData[] = getHyperdropLeavesData();
  fs.writeFileSync(
    configPath,
    JSON.stringify({
      hyperdrop: merkleLeaves
    })
  );

  // Check if config exists
  if (!fs.existsSync(configPath)) {
    throwErrorAndExit("Missing config.json. Please add.");
  }

  // Read config
  const configFile: Buffer = await fs.readFileSync(configPath);
  const configData = JSON.parse(configFile.toString());

  // Check if config contains airdrop key
  if (configData["hyperdrop"] === undefined) {
    throwErrorAndExit("Missing hyperdrop param in config. Please add.");
  }

  // Collect config
  const hyperdrop: BountyxMerkleLeafData[] = configData.hyperdrop;

  // Initialize and call generator
  const generator = new BountyxMerkleProofGenerator(hyperdrop);
  await generator.process();
})();
