"use client";

import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TickerModel } from "@/types/stocks";
import { Banknote } from "lucide-react";

interface IProps {
  ticker: TickerModel;
  onClick: () => void;
  className?: string;
  isSelected?: boolean;
}

export default function TickerCard({
  ticker,
  onClick,
  className,
  isSelected,
}: IProps) {
  return (
    <Card
      className={cn(
        " cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 ",
        isSelected && "bg-gray-100 dark:bg-gray-900",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 p-2 pl-3 pr-3">
        <div className="space-y-1">
          <CardTitle className="text-md">{ticker.symbol}</CardTitle>
          <CardDescription className="text-sm">{ticker.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-2  pl-3 pr-3">
        <div className="flex space-x-4 text-sm text-muted-foreground  justify-between w-full">
          <div className="flex items-center text-xs gap-1">
            <Banknote className="mr-1 h-5 w-5 " />
            {ticker.currency}
          </div>
          <Badge variant={"secondary"} className="pb-1 rounded-full text-xs">
            {ticker.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
