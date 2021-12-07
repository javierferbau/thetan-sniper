import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchDatas } from "../../api/fetch";
import { mapHerosCalc } from "./utils";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price (wbnb)",
    accessor: "price",
  },
  {
    Header: "Hero Cost ($)",
    accessor: "usdPrice",
  },
  {
    Header: "Maximum Battles",
    accessor: "battleCap",
  },
  {
    Header: "Hero Rarity",
    accessor: "heroRarityString",
  },
  {
    Header: "Maximum $ Win By Hero Rarity",
    accessor: "winCalc",
    Footer: "(Hero cost by rarity + maximum gTHC by win) x THC price",
  },
  {
    Header: "Maximum Benefits ",
    accessor: "winDiffCalc",
    Footer: "Hero cost - Maximum $ by Win",
  },
];

export const useDashboard = () => {
  const [wbnbPrice, setwbnbPrice] = useState<number>(0);
  const [THCPrice, setTHCPrice] = useState<number>(0);
  const [isRefetchInterval, setIsRefetchInterval] = useState<boolean>(false);
  const [heroes, setHeroes] = useState<any>();
  const [herosPriceAlarm, setPriceAlarm] = useState<number>(61);
  const [needAlarm, setNeedAlarm] = useState<boolean>(true);
  const [alarm] = useState(
    new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
  );

  document.title = "Thetan-sniper";
  const { data, isLoading } = useQuery(
    "heros",
    () =>
      fetchDatas(
        "https://data.thetanarena.com/thetan/v1/nif/search?sort=PriceAsc&size=3852"
      ),
    {
      refetchInterval: isRefetchInterval ? 1000 : false,
    }
  );

  const { isLoading: iswbnbPriceLoading } = useQuery(
    "wbnbPrice",
    () =>
      fetchDatas(
        "https://exchange.thetanarena.com/exchange/v1/currency/price/32"
      ).then((result) => {
        setwbnbPrice(result.data.toFixed(2));
      }),
    {
      refetchInterval: isRefetchInterval ? 10000 : false,
    }
  );

  const { isLoading: isTHCPriceLoading } = useQuery(
    "THCPrice",
    () =>
      fetchDatas(
        "https://exchange.thetanarena.com/exchange/v1/currency/price/11"
      ).then((result) => {
        setTHCPrice(result.data.toFixed(2));
      }),
    {
      refetchInterval: isRefetchInterval ? 10000 : false,
    }
  );

  useEffect(() => {
    if (data && data.data && wbnbPrice && THCPrice) {
      const heroes = mapHerosCalc(data.data, wbnbPrice, THCPrice);
      setHeroes(heroes);
    }
  }, [data, wbnbPrice, THCPrice]);

  useEffect(() => {
    if (needAlarm && heroes && heroes.some((x: any) => x.needAlarm)) {
      alarm.play();
    }

    if (!needAlarm) {
      alarm.pause();
    }
  }, [heroes, alarm, needAlarm]);

  return [
    wbnbPrice,
    heroes,
    isLoading,
    iswbnbPriceLoading,
    THCPrice,
    isTHCPriceLoading,
    columns,
    isRefetchInterval,
    setIsRefetchInterval,
    herosPriceAlarm,
    setPriceAlarm,
    needAlarm,
    setNeedAlarm,
  ];
};
