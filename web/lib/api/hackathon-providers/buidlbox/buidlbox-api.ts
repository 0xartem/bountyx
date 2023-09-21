import axios from "axios"
import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { BountyxMerkleLeafData } from '@/../packages/bountyx-hyperdrop/src/types/bountyxmerkleleafdata'

import challengesAndWinners from './challenges-and-winners.json'
import { HypercertMetadata } from "@hypercerts-org/hypercerts-sdk"

const convertToBountyxMetadata = async (groupName: string): Promise<BountyxMetadata[]> => {
  const bountiesMetadata: BountyxMetadata[] = []

  for (const bounty of challengesAndWinners) {
    const partialBountyXMetadata = {
      group: groupName,
      name: bounty.name,
      description: bounty.description,
      issuer: {
        issuerName: bounty.submittedByOrgName,
        issuerLogoUrl: bounty.submittedByOrgLogo,
      },
    }

    if (bounty.rewardPool) {
      bountiesMetadata.push({
        ...partialBountyXMetadata,
        reward: {
          rewardAmount: bounty.rewardPool,
          rewardToken: bounty.rewardToken,
          rewardInToken: false,
        },
      })
    }

    for (const reward of bounty.rewards) {
      bountiesMetadata.push({
        ...partialBountyXMetadata,
        reward: {
          rewardAmount: reward.rewardAmountUsd,
          rewardToken: bounty.rewardToken,
          rewardInToken: false,
        },
      })
    }
  }

  return bountiesMetadata
}

export const getHypercertMetadataFromWinner = async (bountyName: string): Promise<HypercertMetadata> => {
  const hypercerMetadataOptions: HypercertMetadata[] = []

  const bounty = challengesAndWinners.find(item => item.name === bountyName)
  if (bounty && bounty.winners.length > 0) {
    const winner = bounty.winners[0]
    const hypercertMetadata: HypercertMetadata = {
      name: winner.name,
      description: winner.description,
      image: winner.logoUrl!
    }
    hypercerMetadataOptions.push(hypercertMetadata)
  }

  console.log('Hypercerts:', hypercerMetadataOptions)
  return hypercerMetadataOptions[0]
}

export const getAllGroups = (): string[] => {
  return ['Eth Denver 2023']
}

export const getHyperdropLeavesPublicData = async (): Promise<BountyxMerkleLeafData[]> => {
  const bounties: BountyxMetadata[] = await convertToBountyxMetadata("ETHDenver 2023")
  const bountyxMerkleLeafs: BountyxMerkleLeafData[] = []
  for (const bounty of bounties) {
    bountyxMerkleLeafs.push({
      group: bounty.group ?? '',
      bountyName: bounty.name,
      issuerName: bounty.issuer.issuerName,
      receiverAddress: bounty.receiver?.receiverAddress ?? '0x0000000000000000000000000000000000000000',
      reward: {
        rewardAmount: bounty.reward.rewardAmount,
      },
    })
  }
  return bountyxMerkleLeafs
}

export const getBountyXMetadataItem = async (leafData: BountyxMerkleLeafData): Promise<BountyxMetadata> => {
  //TODO: temp before persistency is built
  const bountyxMetadataItems: BountyxMetadata[] = await convertToBountyxMetadata("ETHDenver 2023")
  const metadataItem = bountyxMetadataItems.find(
    (item) =>
      leafData.bountyName === item.name &&
      leafData.issuerName === item.issuer.issuerName &&
      leafData.group === item.group &&
      leafData.reward.rewardAmount === item.reward.rewardAmount
  )
  if (!metadataItem) {
    throw new Error('Cannot locate bountyx metadata item')
  }
  return metadataItem
}
