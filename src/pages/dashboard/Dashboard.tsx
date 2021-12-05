import React from "react";
import Table from "../components/Table";
import { useDashboard } from "./useDashboard";
import { mapHerosCalc } from "./utils";

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
  ] = useDashboard();

  return (
    <>
      <div>Wbnb Price: {!iswbnbPriceLoading && wbnbPrice}$</div>
      <div>THC Price: {!isTHCPriceLoading && THCPrice}$</div>
      <button onClick={() => setIsRefetchInterval(!isRefetchInterval)}>
        {isRefetchInterval ? "⏸" : "▶"}
      </button>
      <br></br>
      <div>
        {!isLoading && (
          <Table
            columns={columns}
            data={mapHerosCalc(heroes.data, wbnbPrice, THCPrice)}
          />
        )}
      </div>
    </>
  );
}
