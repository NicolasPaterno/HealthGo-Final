import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface OccupancyChartProps {
  occupancyRate: number;
  previousRate?: number;
}

export function OccupancyChart({ occupancyRate, previousRate = 0 }: OccupancyChartProps) {
  const isIncreasing = occupancyRate > previousRate;
  const change = Math.abs(occupancyRate - previousRate);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Taxa de Ocupação</span>
          <div className="flex items-center gap-2">
            {isIncreasing ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm ${isIncreasing ? 'text-green-500' : 'text-red-500'}`}>
              {isIncreasing ? '+' : '-'}{change.toFixed(1)}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{occupancyRate}%</span>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Mês atual</p>
              <p className="text-xs text-muted-foreground">
                {previousRate}% mês anterior
              </p>
            </div>
          </div>

          {/* Barra de progresso visual */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${occupancyRate >= 80
                  ? 'bg-green-500'
                  : occupancyRate >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              style={{ width: `${Math.min(occupancyRate, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
