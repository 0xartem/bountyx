import { BigNumber } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'
import { assertNever } from './common'
import _ from 'lodash'

export type AddressOrEns = `0x${string}` | `${string}.eth` | 'future rewards'

export const formatScope = (scopeLabel: string) => scopeLabel.toLowerCase().replaceAll(/\s+/g, '-').trim()

export const formatScopeList = (scopeLabels: string[]) => {
  if (scopeLabels.length === 0) {
    return ''
  }

  if (scopeLabels.length === 1) {
    return scopeLabels[0]
  }

  const initial = _.initial(scopeLabels)
  const last = _.last(scopeLabels)

  return `${initial.join('-')} & ${last}`
}

export const formatContributors = (contributors: string[]) => {
  if (contributors.length === 0) {
    return ''
  }

  if (contributors.length === 1) {
    return contributors[0]
  }

  const initial = _.initial(contributors)
  const last = _.last(contributors)

  return `${initial.join(', ')} & ${last}`
}

export const formatContributorsList = (
  contributorsList: AddressOrEns[],
  opts?: {
    lowercase?: 'all' | 'addresses'
    deduplicate?: boolean
  }
): AddressOrEns[] => {
  let list = contributorsList
    // Cleanup
    .map((i) => i.trim())
    // Filter out non-truthy values
    .filter((i) => !!i)
  if (opts?.lowercase) {
    switch (opts.lowercase) {
      case 'all':
        list = list.map((x) => x.toLowerCase())
        break
      case 'addresses':
        list = list.map((x) => (isAddress(x) ? x.toLowerCase() : x))
        break
      default:
        assertNever(opts.lowercase)
    }
  }
  if (opts?.deduplicate) {
    list = _.uniq(list)
  }
  return list as AddressOrEns[]
}

export const formatFractionPercentage = (fractionUnits: string, totalUnits: string) => {
  const totalUnitsParsed = parseInt(totalUnits, 10)
  if (totalUnitsParsed === 0) {
    return '0%'
  }

  const fractionUnitsParsed = parseInt(fractionUnits, 10)

  const fraction = fractionUnitsParsed / totalUnitsParsed
  const percentage = fraction * 100

  return `${percentage.toFixed(2)}%`
}

export const formatTime = (startTime: number, endTime?: number) => {
  if (startTime === endTime) {
    return new Date(startTime * 1000).toDateString()
  }

  if (endTime === undefined) {
    return `from ${new Date(startTime * 1000)}`
  }

  return `${new Date(startTime * 1000).toDateString()} until ${new Date(endTime * 1000).toDateString()}`
}

export const getOpenSeaFractionUrl = (tokenId: string, contractAddress: string) => {
  return `https://testnets.opensea.io/assets/goerli/${contractAddress}/${BigNumber.from(tokenId).toNumber()}`
}

export const formatAddress = (address: string) => {
  if (address.length > 14) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }
  return address
}

/**
 * Prefix cid with `ipfs://` if it's not already
 * @param cid
 * @returns
 */
export const cidToIpfsUri = (cid: string) => (cid.startsWith('ipfs://') ? cid : `ipfs://${cid}`)
