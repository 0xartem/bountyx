import axios from "axios";
import { writeFileSync } from "fs";

const getHackathons = async (size: number): Promise<any[]> => {
  const response = await axios.get(
    `https://api.buidlbox.io/buidlbox/v1/hackathons?size=${size}`
  )
  return response.data.hackathons
}

const findHackathonByName = (hackathons: any[], hackathonName: string): any|undefined => {
  return hackathons.find(hackathon => hackathon.hackathonName === hackathonName)
}

const getChallengesByPage = async (hackathonId: string, page: number): Promise<any[]> => {
  const response = await axios.get(
    `https://api.buidlbox.io/buidlbox/v1/hackathons/${hackathonId}/challenges?page=${page}`
  );
  return response.data.challenges;
};

const getWinnersByChallenge = async (hackathonId: string, challengeId: string): Promise<any> => {
  const response = await axios.get(
    `https://api.buidlbox.io/buidlbox/v1/hackathons/${hackathonId}/challenges/${challengeId}/projects?isWinner=true`
  );
  return response.data.projects;
};

const getAllChallenges = async (hackathonId: string): Promise<any> => {
  const allChallenges: any = [];
  let challenges: any[] = await getChallengesByPage(hackathonId, 1);
  for (let i = 2; challenges.length > 0; i++) {
    for (let challenge of challenges) {
      const dupChallenge = allChallenges.find((newChallenge: any) => newChallenge.challengeId === challenge.challengeId)
      if (dupChallenge) {
        console.log('Dup', dupChallenge.name)
        continue
      }
      const winners = await getWinnersByChallenge(hackathonId, challenge.challengeId);
      challenge.winners = winners;
      allChallenges.push(challenge);
    }
    console.log('Length: ', allChallenges.length)
    challenges = await getChallengesByPage(hackathonId, i);
  }
  return allChallenges;
};

const getEthDenverChallengesAndWinners = async (limit: number): Promise<any> => {
  const hackathons = await getHackathons(limit)
  const targetHackathon = findHackathonByName(hackathons, "Fund Public Goods")
  return await getAllChallenges(targetHackathon.hackathonId)
}

getEthDenverChallengesAndWinners(100)
  .then((challenges) => {
    console.log(challenges.length);
    writeFileSync("challenges-and-winners.json", JSON.stringify(challenges));
  })
  .catch((err) => {});
