import { BountyxMetadata } from "../types/bountyxdata";
import { BountyxMerkleLeafData } from "../types/bountyxmerkleleafdata";
import challengesAndWinners from "../../data/challenges-and-winners.json"
import ftcProjects from "../../data/ftc-projects.json"
import getWinnerAddress from "./winner-address-api";
import { HyperdropRecipient } from "../generators/address-merkle-proof-generator";

const convertToBountyxMetadata = (groupName: string): BountyxMetadata[] => {
  const bountiesMetadata: BountyxMetadata[] = [];

  for (const bounty of challengesAndWinners) {
    const partialBountyXMetadata = {
      group: groupName,
      name: bounty.name,
      description: bounty.description,
      issuer: {
        issuerAddress: "0x0000000000000000000000000000000000000000",
        issuerName: bounty.submittedByOrgName,
        issuerLogoUrl: bounty.submittedByOrgLogo
      }
    };

    if (bounty.rewardPool) {
      bountiesMetadata.push({
        ...partialBountyXMetadata,
        // receiver: {
        //   receiverAddress: "0x0000000000000000000000000000000000000000"
        // },
        reward: {
          rewardAmount: bounty.rewardPool,
          rewardToken: bounty.rewardToken,
          rewardInToken: false
        }
      });
    }

    for (const reward of bounty.rewards) {
      bountiesMetadata.push({
        ...partialBountyXMetadata,
        // receiver: {
        //   receiverAddress: "0x0000000000000000000000000000000000000000"
        // },
        reward: {
          rewardAmount: reward.rewardAmountUsd,
          rewardToken: bounty.rewardToken,
          rewardInToken: false
        }
      });
    }
  }

  return bountiesMetadata;
};

export const getHyperdropLeavesData = (): BountyxMerkleLeafData[] => {
  const bounties: BountyxMetadata[] = convertToBountyxMetadata("Fund Public Goods");
  const bountyxMerkleLeafs: BountyxMerkleLeafData[] = [];
  for (const bounty of bounties) {
    bountyxMerkleLeafs.push({
      group: bounty.group ?? "",
      bountyName: bounty.name,
      issuerName: bounty.issuer.issuerName,
      receiverAddress:
        bounty.receiver?.receiverAddress ??
        getWinnerAddress(
          bounty.group ?? "",
          bounty.name,
          bounty.reward.rewardAmount
        ),
      reward: {
        rewardAmount: bounty.reward.rewardAmount
      }
    });
  }
  return bountyxMerkleLeafs;
};

export const getHyperdropAddressLeavesData = (): HyperdropRecipient[] => {
  const hyperdropRecipients: HyperdropRecipient[] = []
  for (const project of ftcProjects) {
    hyperdropRecipients.push({ address: project.receiver.receiverAddress })
  }
  return hyperdropRecipients
}