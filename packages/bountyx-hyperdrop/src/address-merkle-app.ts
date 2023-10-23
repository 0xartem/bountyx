import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import { logger } from "./utils/logger"; // Logging
import { getHyperdropAddressLeavesData } from "./leaves-data/config-generator";
import AddressMerkleProofGenerator, { HyperdropRecipient } from "./generators/address-merkle-proof-generator";

// Config file path
const configPath: string = path.join(__dirname, "../addresses-config.json");

/**
 * Throws error and exists process
 * @param {string} erorr to log
 */
function throwErrorAndExit(error: string): void {
  logger.error(error);
  process.exit(1);
}

(async () => {
  const merkleLeaves: HyperdropRecipient[] = getHyperdropAddressLeavesData();
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
  const hyperdrop: HyperdropRecipient[] = configData.hyperdrop;

  // Initialize and call generator
  const generator = new AddressMerkleProofGenerator(hyperdrop);
  await generator.process();
})();
