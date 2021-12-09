import React, { useState } from "react";
import Table from "../components/Table";
import { useDashboard } from "./useDashboard";

export default function Dashboard() {
  const [
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
  ] = useDashboard();
  const [herosPrice, setPrice] = useState<number>(herosPriceAlarm);

  return (
    <>
      <div>WBNB Price: {!iswbnbPriceLoading && wbnbPrice}$</div>
      <div>THC Price: {!isTHCPriceLoading && THCPrice}$</div>
      Alarm --{">"}
      <input
        value={herosPrice}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />
      <button onClick={() => setPriceAlarm(herosPrice)}>
        {`🔊 => ${herosPriceAlarm}`}
      </button>
      <button onClick={() => setNeedAlarm(!needAlarm)}>
        {needAlarm ? "🔊" : "🔈"}
      </button>
      <br></br>
      <button onClick={() => setIsRefetchInterval(!isRefetchInterval)}>
        {isRefetchInterval ? "⏸" : "▶"}
      </button>
      <br></br>
      <div>
        {!isLoading && heroes && (
          <Table
            columns={columns}
            data={heroes}
            onClickRow={(row: any) =>
              window.open(
                `https://marketplace.thetanarena.com/item/${row.original.refId}`
              )
            }
          />
        )}
      </div>
    </>
  );
}
