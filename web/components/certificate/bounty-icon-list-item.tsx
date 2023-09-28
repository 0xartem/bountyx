import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
interface BountyIconListProps {
  bountyMetadata: BountyxMetadata
}

interface IconListProps {
  logoUrl: string
}

export const BountyIconListItem = ({ bountyMetadata }: BountyIconListProps) => {
  let iconUrl = bountyMetadata.issuer.issuerLogoUrl
  if (!bountyMetadata) {
    return null
  }

  return (
    <div
      // style={{ backgroundImage: `url(/sponsor-images/${bountyMetadata.issuer.issuerName!.replace(/\s/g, '') + '-logo.png'})` }}
      className="my-4 h-12 w-12 rounded-full bg-cover bg-center ">
      <img src={bountyMetadata.issuer.issuerLogoUrl!} alt={bountyMetadata.issuer.issuerName} />
    </div>
  )
}

export const HackathonIconListItem = ({ logoUrl }: IconListProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${logoUrl})` }}
      className="my-4 h-24 w-24 rounded-full bg-cover bg-center "></div>
  )
}


export const ProjectIconListItem = ({ logoUrl }: IconListProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${logoUrl})` }}
      className="my-4 h-24 w-24 rounded-md bg-cover bg-center "></div>
  )
}
