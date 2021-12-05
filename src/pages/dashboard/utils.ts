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

  return heros.map((hero) => {
    return {
      ...hero,
      usdPrice: (hero.price / 100000000) * wbnbPrice,
      heroRarityString: `${heroRarityDiccionary[hero.heroRarity]} (${
        heroRarityWinByWinDiccionary[hero.heroRarity]
      } gTHC).`,
      winCalc:
        hero.battleCap *
        (heroRarityWinByWinDiccionary[hero.heroRarity] + 6) *
        THCPrice,
      winDiffCalc:
        hero.battleCap *
          (heroRarityWinByWinDiccionary[hero.heroRarity] + 6) *
          THCPrice -
        (hero.price / 100000000) * wbnbPrice,
    };
  });
}
