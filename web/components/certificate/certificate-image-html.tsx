import * as React from 'react'

import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'

import { BountyIconListItem, HackathonIconListItem, ProjectIconListItem } from './bounty-icon-list-item'
import { LocalCertData } from '@/lib/bountyx/bountyx-hypercert-utils'
import { getEventTimeline } from '@/lib/api/hackathon-providers/event-timeline'

export default function CertificateImageHtml({
  localCertData,
  bounties
}: {
  localCertData: LocalCertData
  bounties: BountyxMetadata[]
}) {
  // Declare a new state variable, which we'll call "count"

  const renderBounties = (): any[] => {
    if (!bounties) return []

    const list: any[] = []
    bounties.forEach((item: BountyxMetadata) => {
      list.push(<BountyIconListItem bountyMetadata={item} />)
    })
    return list
  }

  const renderImpactBadges = (): any[] => {
    let impactScopeBadgeList: any[] = []
    let impactScopeNameList: string[] = []
    bounties.forEach((bounty) => {
      if (!impactScopeNameList.includes(bounty.issuer?.issuerName!)) {
        impactScopeNameList.push(bounty.issuer?.issuerName!)
        impactScopeBadgeList.push(<div className="badge-outline badge mr-2">{bounty.issuer?.issuerName!}</div>)
      }
    })
    return impactScopeBadgeList
  }

  return (
    <>
      <div
        className="border--slate-700 divide--slate-700 relative h-[525px] w-[375px] divide-y overflow-hidden rounded-3xl border-2 bg-gradient-to-r from-blue-500 to-green-300">
        <div className="flex flex-row justify-between my-4 mx-8">
          <div className='flex flex-col justify-center'>
            <HackathonIconListItem logoUrl={'/fundingthecommons.png'} />
            <ProjectIconListItem logoUrl={localCertData.image} />
          </div>
          <div className='flex flex-col justify-center'>
            {renderBounties()}
          </div>
        </div>
        <div className=" absolute left-0 top-[300px] h-[225px] w-[375px] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <div className="mx-10">
            <div className="my-4">
              <span className="font-sans text-3xl font-bold decoration-white antialiased">{localCertData.name}</span>
            </div>
            <div className="my-2">
              <span className="text-small font-sans decoration-white antialiased">{getEventTimeline(bounties)}</span>
            </div>
            <div className="badge-outline badge mr-2">{bounties.at(0)?.group}</div>
            <div className="mt-10 mb-2 flex-row">
              <span className="text-small font-sans decoration-white antialiased">Impacted Organizations</span>
            </div>
            {renderImpactBadges()}
          </div>
        </div>
      </div >
    </>
  )
}
