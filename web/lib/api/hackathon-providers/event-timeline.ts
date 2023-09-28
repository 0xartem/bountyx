import { BountyxMetadata } from "@/bountyxlib/types/bountyxdata";

export function getEventTimeline(bounties: BountyxMetadata[]): string {
    if (bounties.length === 0) {
        return 'Unknown'
    }
    switch (bounties[0].group) {
        case 'ETHDenver 2023':
            return '2023-02-25 ⟶ 2023-03-04'
        case 'Canto Hackathon':
            return '2023-03-13 ⟶ 2023-03-31'
        case 'Fund Public Goods':
            return '2023-08-01 ⟶ 2023-08-31'
        default:
            return 'Unknown'
    }
}