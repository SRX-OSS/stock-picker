"use client";

import { Badge } from "../ui/badge";
import StockSearch from "./StockSearch";
import TickerCard from "./TickerCard";
import { Separator } from "@/components/ui/separator";
import { removeDuplicatesObjectArray } from "@/lib/performanceUtils";
import { TickerModel } from "@/types/stocks";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  setSelectedStock: Dispatch<SetStateAction<TickerModel | null>>;
  selectedStock: TickerModel | null;
}

export default function StocksListing({
  setSelectedStock,
  selectedStock,
}: IProps) {
  const [stocksList, setStocksList] = useState<TickerModel[]>([]);

  const handleSelectedStock = (selectedTicker: TickerModel) => {
    setSelectedStock(selectedTicker);
    setStocksList((prev: TickerModel[]) =>
      removeDuplicatesObjectArray([...prev, selectedTicker], "symbol")
    );
  };

  return (
    <aside
      className="w-[30%] h-[85vh] max-h-[85vh] relative border rounded-md overflow-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100
                 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800  "
    >
      <StockSearch setSelectedStock={handleSelectedStock} />
      <Separator />
      <div className="text-sm  -tracking-tighter pt-16 pl-2 mt-1 ">
        <Badge variant={"secondary"}>My Tickers</Badge>
      </div>
      {stocksList?.length > 0 ? (
        <div className="pt-4 flex flex-col gap-3 ">
          {stocksList?.map((ticker: TickerModel) => (
            <TickerCard
              ticker={ticker}
              className={"rounded-none border-none border-b"}
              isSelected={selectedStock?.symbol === ticker.symbol}
              onClick={() => setSelectedStock(ticker)}
            />
          ))}
        </div>
      ) : (
        <div className="pt-40 flex justify-center text-xs w-full text-gray-500  ">
          No Tickers Selected.
        </div>
      )}
    </aside>
  );
}
