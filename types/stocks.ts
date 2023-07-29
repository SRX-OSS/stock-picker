export interface TickerModel {
  symbol: string;
  name: string;
  type?: string;
  currency?: string;
}

export interface StockPriceModel {
  open: string;
  high: string;
  low: string;
  price: string;
  dateTrade: string;
  change: string;
  changePercent: string;
}

export interface StockOverviewModel {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Industry: string;
  PERatio: string;
  MarketCapitalization: string;
}

export interface StockDayTimeSeriesModel {
  Interval: string;
  lastRefreshed: string;
  timeSeries: StockTimeSeries[];
}

export interface StockTimeSeries {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  time: Date;
}
