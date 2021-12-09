const heroRarityWinByWinDiccionary: number[] = [];
heroRarityWinByWinDiccionary[0] = 1.45;
heroRarityWinByWinDiccionary[1] = 5;
heroRarityWinByWinDiccionary[2] = 23.55;

const heroRarityDiccionary: string[] = [];
heroRarityDiccionary[0] = "Common";
heroRarityDiccionary[1] = "Epic";
heroRarityDiccionary[2] = "Legendary";

const calcWinDiff = (hero: any, wbnbPrice: number, THCPrice: number) =>
  hero.battleCap *
    (heroRarityWinByWinDiccionary[hero.heroRarity] + 6) *
    THCPrice -
  (hero.price / 100000000) * wbnbPrice;

const calcUsdPrice = (hero: any, wbnbPrice: number) =>
  (hero.price / 100000000) * wbnbPrice;

export function mapHerosCalc(
  heros: Record<any, any>[],
  wbnbPrice: number,
  THCPrice: number
) {
  return heros.map((hero) => {
    return getVitaminatedHero(hero, wbnbPrice, THCPrice);
  });
}

export const getVitaminatedHero = (
  hero: any,
  wbnbPrice: number,
  THCPrice: number
) => {
  return {
    ...hero,
    usdPrice: calcUsdPrice(hero, wbnbPrice),
    heroRarityString: `${heroRarityDiccionary[hero.heroRarity]} (${
      heroRarityWinByWinDiccionary[hero.heroRarity]
    } gTHC).`,
    winCalc:
      hero.battleCap *
      (heroRarityWinByWinDiccionary[hero.heroRarity] + 6) *
      THCPrice,
    winDiffCalc: calcWinDiff(hero, wbnbPrice, THCPrice),
    winBenefitTantPerCent: `${Math.trunc(
      ((Math.trunc(calcWinDiff(hero, wbnbPrice, THCPrice)) -
        Math.trunc(calcUsdPrice(hero, wbnbPrice))) /
        Math.trunc(calcWinDiff(hero, wbnbPrice, THCPrice))) *
        100
    )}%.`,
    needAlarm: (hero.price / 100000000) * wbnbPrice < 61,
    silenceAlarm: false,
  };
};
