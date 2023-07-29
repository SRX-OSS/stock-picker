"use client";

import TickerCard from "./TickerCard";
import { useFetchStocksTickers } from "./utils";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TickerModel } from "@/types/stocks";
import debounce from "lodash/debounce";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";

interface IProps {
  setSelectedStock: (_: TickerModel) => void;
}

export default function StockSearch({ setSelectedStock }: IProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Hook to fetch Stocks Suggestions on Query Change
  const { loadedTickersList, isLoading, isError } =
    useFetchStocksTickers(searchQuery);

  // Handle Search query
  const handleSearchQueryChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 250);

  // Handle User Input change
  const handleQueryInputChange = (e: any) => {
    e.preventDefault();
    handleSearchQueryChange(e.target.value);
  };

  return (
    <section
      className={cn(
        "pt-2 pb-2 px-3  z-50 bg-gray-50 dark:bg-gray-950 absolute top-0 w-full rounded-md  h-auto",
        loadedTickersList?.length ? "over-shadow" : "shadow"
      )}
    >
      <div className="w-full flex items-center">
        <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 " />
        <Input
          type="text"
          placeholder="Search ans Add Stocks, MF and more..."
          className="border-0 -tracking-tight outline-none bg-gray-50 dark:bg-gray-950"
          onChange={handleQueryInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchQuery("");
              setSelectedStock(loadedTickersList?.[0]);
              return;
            }
          }}
        />
      </div>
      {searchQuery && isLoading && (
        <div className="w-full flex justify-center p-5 items-center">
          <Loader2 className="animate-spin h-6 w-6 " />
        </div>
      )}
      {searchQuery && !isLoading && loadedTickersList?.length < 1 ? (
        <div className="p-5 pt-10 m-auto flex justify-center break-words text-center w-full text-xs text-gray-500 dark:text-gray-400">
          No Stocks Found with the Symbol "{searchQuery}".
        </div>
      ) : (
        isError && (
          <div className="p-5 pt-10 m-auto flex justify-center break-words text-center w-full text-xs text-red-500 font-medium ">
            Something Went Wrong! Please try again later.
          </div>
        )
      )}
      {searchQuery && loadedTickersList?.length > 0 && (
        <div className="pt-2 flex flex-col gap-3 ">
          {loadedTickersList?.map((ticker: TickerModel) => (
            <TickerCard
              ticker={ticker}
              onClick={() => setSelectedStock(ticker)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
