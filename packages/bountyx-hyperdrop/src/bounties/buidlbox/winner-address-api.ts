export default function getWinnerAddress(
  group: string,
  bountyName: string,
  rewardAmount: number
) {
  if (
    (bountyName === "Improve the efficiency and scalability of public goods funding through deployment of new products, systems, and financial instruments" &&
      rewardAmount === 8000) ||
    (bountyName === "Best use of data tagged with provenance information for an impact evaluator" &&
      rewardAmount === 5000) ||
    (bountyName === "Gitcoin x Funding the Commons: Best Public Goods Funding project " && rewardAmount === 10000)
  ) {
    return "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // hardhat/foundry address #0
  }
  return "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"; // hardhat/foundry address #9
}
