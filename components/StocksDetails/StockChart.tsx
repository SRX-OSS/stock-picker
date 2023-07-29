"use client";

import { StockDayTimeSeriesModel } from "@/types/stocks";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IProps {
  loadedTimeSeriesData: StockDayTimeSeriesModel | null;
  isLoading: Boolean;
  isRateLimited: Boolean;
}

export default function StocksChart({
  loadedTimeSeriesData,
  isRateLimited,
}: IProps) {
  const getTimeSeriesList = () => {
    const modifiedSeriesList = [];
    const seriesList = loadedTimeSeriesData?.timeSeries || [];
    let firstDate = -1;

    for (let index = 0; index < seriesList.length; index++) {
      const seriesItem = seriesList[index];

      // Limit Time Series Data to One day only
      const dateTime = new Date(seriesItem?.time);
      if (firstDate === -1) {
        firstDate = dateTime.getDate();
      } else if (firstDate !== dateTime.getDate()) {
        break;
      }

      modifiedSeriesList.unshift({
        x: new Date(seriesItem?.time),
        y: [
          seriesItem?.open,
          seriesItem?.high,
          seriesItem?.low,
          seriesItem?.close,
        ],
      });
    }
    return modifiedSeriesList;
  };

  const series: any = useMemo(
    () => [
      {
        name: "candle",
        data: loadedTimeSeriesData?.timeSeries ? getTimeSeriesList() : [],
      },
    ],
    [loadedTimeSeriesData?.timeSeries?.length]
  );

  const options: any = {
    chart: {
      height: 450,
      type: "candlestick",
    },
    title: {
      text: `CandleStick Chart (${loadedTimeSeriesData?.Interval}) - ${dayjs(
        new Date(`${loadedTimeSeriesData?.lastRefreshed}`)
      ).format("DD-MM-YYYY")}`,
      align: "left",
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val: any) {
          return dayjs(val).format("h:mm A");
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return isRateLimited ? (
    <div className="p-10 flex justify-center items-center text-sm">
      API Rate limit Exceed. Wait for 1 Minute.{" "}
    </div>
  ) : (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
}
