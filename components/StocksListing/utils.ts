import { STOCKS_API_BASE_URL } from "@/config/api";
import { TickerModel } from "@/types/stocks";
import useSWR from "swr";

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

export const useFetchStocksTickers = (searchQuery: string) => {
  const fullApiURL = !searchQuery?.trim()
    ? null
    : `${STOCKS_API_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${process.env.NEXT_PUBLIC_STOCK_API_KEY}`;

  const { data, error, isLoading } = useSWR(fullApiURL, fetcher, {
    dedupingInterval: 600000,
    revalidateOnFocus: false,
  });

  const beautifyTickerResponse = (tickerList: any): TickerModel[] => {
    return tickerList?.map((ticker: any) => ({
      symbol: ticker?.["1. symbol"],
      name: ticker?.["2. name"],
      type: ticker?.["3. type"],
      currency: ticker?.["8. currency"],
    }));
  };

  return {
    loadedTickersList: beautifyTickerResponse(data?.bestMatches || []),
    isLoading: isLoading,
    isError: error,
  };
};
