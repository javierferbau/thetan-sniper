import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import _ from "lodash";
import { fetchDatas } from "../../api/fetch";
import { mapHerosCalc, getVitaminatedHero } from "./utils";

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

  const columns = [
    {
      Header: "Silence alarm",
      accessor: "silenceAlarm",
      Cell: (props: any) => {
        return (
          <button onClick={() => silenceHero(props.row.original.id)}>
            {!props.row.original.silenceAlarm ? "🔊" : "🔈"}
          </button>
        );
      },
    },
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
    {
      Header: "Benefits %",
      accessor: "winBenefitTantPerCent",
      Footer: "100*(P-C)/P",
    },
  ];

  document.title = "Thetan-sniper";

  const silenceHero = (id: any) => {
    const newHeroList = heroes.map((x: any) => {
      return id === x.id ? { ...x, silenceAlarm: !x.silenceAlarm } : x;
    });
    setHeroes(newHeroList);
  };

  const { data, isLoading } = useQuery(
    "heros",
    () =>
      fetchDatas(
        "https://data.thetanarena.com/thetan/v1/nif/search?sort=PriceAsc&size=3852"
      ).then((result) => {
        if (!heroes) {
          return result;
        }

        const newHeros = result.data.map((newHero: any) => {
          const actualHero = heroes.find((h: any) => h.id === newHero.id);
          if (actualHero) {
            return actualHero;
          }
          return getVitaminatedHero(newHero, wbnbPrice, THCPrice);
        });
        setHeroes(newHeros);
      }),
    {
      refetchInterval: isRefetchInterval ? 2000 : false,
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
    if (
      (data && data.data && !heroes) ||
      (heroes && !heroes[0].winCalc && wbnbPrice && THCPrice)
    ) {
      const heroes = mapHerosCalc(data.data, wbnbPrice, THCPrice);
      setHeroes(heroes);
    }
  }, [data, wbnbPrice, THCPrice, heroes]);

  useEffect(() => {
    if (
      needAlarm &&
      heroes &&
      heroes.some((x: any) => x.needAlarm && !x.silenceAlarm)
    ) {
      alarm.play();
    } else {
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
