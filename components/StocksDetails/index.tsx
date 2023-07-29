"use client";

import StocksInfo from "./StockInfo";
import {
  useFetchStockOverview,
  useFetchStockTodayTimeSeries,
  useFetchStocksPrice,
} from "./utils";
import { cn } from "@/lib/utils";
import { TickerModel } from "@/types/stocks";
import { BarChart3, Loader2 } from "lucide-react";
import { useMemo } from "react";

interface IProps {
  selectedStock: TickerModel | null;
}

export default function StocksDetails({ selectedStock }: IProps) {
  // Hook to fetch Stocks Overview
  const { loadedOverviewData, isOverviewLoading, isOverviewError } =
    useFetchStockOverview(selectedStock?.symbol);

  // Hook to fetch Stocks Price
  const { loadedPriceData, isPriceLoading, isPriceError } = useFetchStocksPrice(
    selectedStock?.symbol
  );

  // Hook to fetch Stocks Time Series
  const { loadedTimeSeriesData, isTimeSeriesLoading, isTimeSeriesError } =
    useFetchStockTodayTimeSeries(selectedStock?.symbol);

  const isRateLimited = useMemo(
    () => !loadedPriceData?.price || !loadedOverviewData?.Name,
    [loadedPriceData?.price, loadedOverviewData?.Name]
  );

  const isLoading = useMemo(
    () => isOverviewLoading || isPriceLoading || isTimeSeriesLoading,
    [isOverviewLoading, isPriceLoading, isTimeSeriesLoading]
  );

  const hasError = useMemo(
    () => isPriceError || isTimeSeriesError || isOverviewError,
    [isPriceError, isTimeSeriesError, isOverviewError]
  );

  return (
    <section
      className={cn(
        "w-[70%] p-3 max-h-[85vh] border rounded-md overflow-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 ",
        isRateLimited ? "h-[85vh]" : "h-auto"
      )}
    >
      {isLoading ? (
        <div className="m-auto h-full w-full flex flex-col gap-4 justify-center items-center">
          <div className=" m-4">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
          <div className="text-sm">Loading Stock Information....</div>
        </div>
      ) : selectedStock?.symbol && !isRateLimited && !hasError ? (
        <StocksInfo
          loadedOverviewData={loadedOverviewData}
          loadedPriceData={loadedPriceData}
          loadedTimeSeriesData={loadedTimeSeriesData}
          isLoading={isLoading}
          isRateLimited={isRateLimited}
          selectedStock={selectedStock}
        />
      ) : (
        <div className="m-auto h-full w-full flex flex-col gap-4 justify-center items-center">
          <div>
            <BarChart3 />
          </div>
          <div className="text-sm">
            {selectedStock?.symbol && (isRateLimited || hasError)
              ? "API Rate limit Exceed. Wait for 1 Minute."
              : "No Stock Selected!"}
          </div>
        </div>
      )}
    </section>
  );
}
