"use client";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import StocksChart from "./StockChart";
import { cn } from "@/lib/utils";
import {
  StockDayTimeSeriesModel,
  StockOverviewModel,
  StockPriceModel,
  TickerModel,
} from "@/types/stocks";
import { Banknote, Factory, TrendingDown, TrendingUp } from "lucide-react";

interface IProps {
  loadedOverviewData: StockOverviewModel;
  loadedPriceData: StockPriceModel;
  loadedTimeSeriesData: StockDayTimeSeriesModel | null;
  isLoading: Boolean;
  isRateLimited: Boolean;
  selectedStock: TickerModel;
}

export default function StocksInfo({
  loadedOverviewData,
  loadedPriceData,
  loadedTimeSeriesData,
  isLoading,
  selectedStock,
  isRateLimited,
}: IProps) {
  return (
    <div className="p-4">
      <div className="w-full flex justify-between items-start gap-2">
        <div className="flex flex-col space-y-1">
          <p className="text-3xl font-semibold leading-none">
            {loadedOverviewData?.Symbol}
          </p>
          <p className="text-md pt-2 leading-none flex justify-start items-center gap-2 text-muted-foreground">
            <Badge className="">{selectedStock?.type}</Badge>

            {loadedOverviewData?.Name}
          </p>
        </div>
        <div className="flex flex-col space-y-1 ">
          <div
            className={cn(
              "font-semibold text-2xl ",
              parseFloat(loadedPriceData.changePercent) < 0
                ? "text-red-500"
                : "text-green-500"
            )}
          >
            {selectedStock?.currency}{" "}
            {parseFloat(loadedPriceData.price).toFixed(2)}
          </div>
          <div
            className={cn(
              "font-medium flex justify-end gap-1 items-center text-sm ",
              parseFloat(loadedPriceData.changePercent) < 0
                ? "text-red-500"
                : "text-green-500"
            )}
          >
            {parseFloat(loadedPriceData.changePercent) >= 0 ? (
              <TrendingUp className="mr-1" />
            ) : (
              <TrendingDown className="mr-1" />
            )}
            {parseFloat(loadedPriceData.changePercent).toFixed(2)}%{" "}
            {`(${parseFloat(loadedPriceData.change).toFixed(2)})`}
          </div>
        </div>
      </div>
      <Separator className="my-5" />
      <StocksChart
        loadedTimeSeriesData={loadedTimeSeriesData}
        isLoading={isLoading}
        isRateLimited={isRateLimited}
      />
      <Separator className="mb-3" />
      <div>
        <div className="flex w-full justify-between items-start">
          <p className="text-xl font-semibold leading-7 ">
            {loadedOverviewData?.Name}
          </p>
          <Badge variant={"outline"} className="text-sm text-muted-foreground">
            {loadedOverviewData?.Exchange}
          </Badge>
        </div>
        <p className="text-sm pt-3 text-muted-foreground">
          {loadedOverviewData?.Description}
        </p>
      </div>
      <div className="flex w-full pt-5 justify-start gap-2 items-center">
        <Badge variant={"secondary"} className=" -tracking-tighter ">
          PE Ratio
        </Badge>
        <p className="text-sm capitalize font-semibold text-gray-500 leading-7 ">
          {parseFloat(loadedOverviewData.PERatio).toFixed(2)}
        </p>
      </div>
      <div className="flex w-full pt-5 justify-start gap-2 items-center">
        <Banknote className="text-gray-500 w-7 h-7" />
        <div className="text-sm text-muted-foreground">MarketCap</div>
        <p className="text-sm capitalize font-semibold text-gray-600 leading-7 ">
          {selectedStock?.currency}{" "}
          {new Intl.NumberFormat("en", {
            maximumSignificantDigits: 3,
          }).format(parseFloat(`${loadedOverviewData?.MarketCapitalization}`))}
        </p>
      </div>
      <div className="flex w-full pt-5 justify-start gap-2 items-start">
        <Factory className="text-gray-500" />
        <p className="text-sm capitalize font-medium text-gray-600 leading-7 ">
          {loadedOverviewData?.Industry?.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
