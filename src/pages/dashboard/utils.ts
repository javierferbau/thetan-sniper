export function mapHerosCalc(
  heros: Record<any, any>[],
  wbnbPrice: number,
  THCPrice: number
) {
  const heroRarityWinByWinDiccionary: number[] = [];
  heroRarityWinByWinDiccionary[0] = 1.45;
  heroRarityWinByWinDiccionary[1] = 5;
  heroRarityWinByWinDiccionary[2] = 23.55;

  const heroRarityDiccionary: string[] = [];
  heroRarityDiccionary[0] = "Common";
  heroRarityDiccionary[1] = "Epic";
  heroRarityDiccionary[2] = "Legendary";

  const calcWinDiff = (hero: any) =>
    hero.battleCap *
      (heroRarityWinByWinDiccionary[hero.heroRarity] + 6) *
      THCPrice -
    (hero.price / 100000000) * wbnbPrice;

  const calcUsdPrice = (hero: any) => (hero.price / 100000000) * wbnbPrice;

  return heros.map((hero) => {
    return {
      ...hero,
      usdPrice: calcUsdPrice(hero),
      heroRarityString: `${heroRarityDiccionary[hero.heroRarity]} (${
        heroRarityWinByWinDiccionary[hero.heroRarity]
      } gTHC).`,
      winCalc:
        hero.battleCap *
        (heroRarityWinByWinDiccionary[hero.heroRarity] + 6) *
        THCPrice,
      winDiffCalc: calcWinDiff(hero),
      winBenefitTantPerCent: `${Math.trunc(
        ((Math.trunc(calcWinDiff(hero)) - Math.trunc(calcUsdPrice(hero))) /
          Math.trunc(calcWinDiff(hero))) *
          100
      )}%.`,
      needAlarm: (hero.price / 100000000) * wbnbPrice < 61,
    };
  });
}
