"use client";

import StocksDetails from "@/components/StocksDetails";
import StocksListing from "@/components/StocksListing";
import { TickerModel } from "@/types/stocks";
import { useState } from "react";

export default function IndexPage() {
  const [selectedStock, setSelectedStock] = useState<TickerModel | null>(null);

  return (
    <section className="container flex items-start gap-6 pb-8 pt-6 md:py-10">
      <StocksListing
        setSelectedStock={setSelectedStock}
        selectedStock={selectedStock}
      />
      <StocksDetails selectedStock={selectedStock} />
    </section>
  );
}
