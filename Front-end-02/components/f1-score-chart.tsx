'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export function F1ScoreChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clean up existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Store the new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"],
        datasets: [{
          data: [23, 60, 36, 30, 17],
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "F1 Score Distribution",
            padding: {
              top: 10,
              bottom: 30
            }
          }
        },
        animation: false
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return <canvas ref={chartRef} className="w-full h-[400px]" />;
}
