import { STOCKS_API_BASE_URL } from "@/config/api";
import {
  StockDayTimeSeriesModel,
  StockOverviewModel,
  StockPriceModel,
} from "@/types/stocks";
import useSWR from "swr";

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export const useFetchStocksPrice = (tickerSymbol?: string | null) => {
  const fullApiURL = !tickerSymbol
    ? null
    : `${STOCKS_API_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${tickerSymbol}&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY_1}`;

  const { data, error, isLoading } = useSWR(fullApiURL, fetcher, {
    dedupingInterval: 100000,
    revalidateOnFocus: false,
  });

  const beautifyResponse = (stockPriceDetails: any): StockPriceModel => {
    return {
      open: stockPriceDetails?.["02. open"],
      high: stockPriceDetails?.["03. high"],
      low: stockPriceDetails?.["04. low"],
      price: stockPriceDetails?.["05. price"],
      dateTrade: stockPriceDetails?.["07. latest trading day"],
      change: stockPriceDetails?.["09. change"],
      changePercent: stockPriceDetails?.["10. change percent"],
    };
  };

  return {
    loadedPriceData: beautifyResponse(data?.["Global Quote"]),
    isPriceLoading: isLoading,
    isPriceError: error,
  };
};

export const useFetchStockOverview = (tickerSymbol?: string | null) => {
  const fullApiURL = !tickerSymbol
    ? null
    : `${STOCKS_API_BASE_URL}/query?function=OVERVIEW&symbol=${tickerSymbol}&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY_2}`;

  const { data, error, isLoading } = useSWR(fullApiURL, fetcher, {
    dedupingInterval: 100000,
    revalidateOnFocus: false,
  });

  return {
    loadedOverviewData: data as StockOverviewModel,
    isOverviewLoading: isLoading,
    isOverviewError: error,
  };
};

export const useFetchStockTodayTimeSeries = (tickerSymbol?: string | null) => {
  const fullApiURL = !tickerSymbol
    ? null
    : `${STOCKS_API_BASE_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${tickerSymbol}&interval=30min&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY_3}`;

  const { data, error, isLoading } = useSWR(fullApiURL, fetcher, {
    dedupingInterval: 100000,
    revalidateOnFocus: false,
  });

  const beautifyResponse = (
    stockPriceTimeSeries: any
  ): StockDayTimeSeriesModel | null => {
    if (!stockPriceTimeSeries) return null;

    const timeSeries = stockPriceTimeSeries?.["Time Series (30min)"];
    const metaData = stockPriceTimeSeries?.["Meta Data"];

    return {
      Interval: metaData?.["4. Interval"],
      lastRefreshed: metaData?.["3. Last Refreshed"],
      timeSeries: timeSeries
        ? Object?.keys(timeSeries)?.map((time) => {
            const timeModel = timeSeries[time];
            return {
              time: new Date(time),
              open: timeModel?.["1. open"],
              high: timeModel?.["2. high"],
              low: timeModel?.["3. low"],
              close: timeModel?.["4. close"],
              volume: timeModel?.["5. volume"],
            };
          })
        : [],
    };
  };
  return {
    loadedTimeSeriesData: beautifyResponse(data),
    isTimeSeriesLoading: isLoading,
    isTimeSeriesError: error,
  };
};
