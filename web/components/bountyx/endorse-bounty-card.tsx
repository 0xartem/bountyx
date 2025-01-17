import { useEffect, useState } from 'react'

import { BountyxMetadata } from '@/bountyxlib/types/bountyxdata'
import { useBountyxSignAllBounties } from '@/hooks/bountyx/use-bountyx-sign-bounty'

import { BountiesList } from './bounties-list'
import { getAllGroups } from '@/lib/api/hackathon-providers/buidlbox/buidlbox-api'

export const EndorseBountyCard = () => {
  const [bounties, setBounties] = useState<BountyxMetadata[]>([])
  const [group, setGroup] = useState<string>('')

  // useEffect(() => {
  //   setBounties(getAllBounties())
  // }, [])

  const [isSigned, setIsSigned] = useState<boolean>(false)

  const { data, isError, isLoading, isSuccess, signMessage } = useBountyxSignAllBounties(bounties)

  useEffect(() => {
    console.log('Signature', data)
    if (isSuccess) {
      // setBounty((prev) => ({ ...prev, signature: data }))
      setIsSigned(true)
    }
  }, [data])

  return (
    <div className="flex flex-col">
      <div className="my-10 flex flex-row items-center gap-10">
        <button className="btn-primary btn w-36" disabled={isSigned || isLoading} onClick={() => signMessage()}>
          Endorse
        </button>
        {isSigned && <div className="badge-success badge w-32 py-5">SIGNED</div>}
      </div>
      <BountiesList setGroup={(group: string) => setGroup(group)} groups={getAllGroups()} bounties={bounties} />
    </div>
  )
}
