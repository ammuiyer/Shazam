'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export function AnalyticsChart() {
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

    Chart.register(ChartDataLabels);

    // Store the new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["0-1", "1-2", "2-3", "3-4", "4-5"],
        datasets: [
          {
            label: "Relevance",
            data: [0, 11, 0, 8, 147],
            backgroundColor: "#36A2EB"
          },
          {
            label: "Coherence",
            data: [0, 10, 0, 2, 154],
            backgroundColor: "#FF6384"
          },
          {
            label: "Similarity",
            data: [0, 28, 17, 48, 73],
            backgroundColor: "#FFCE56"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Distribution of Relevance, Coherence, and Similarity"
          },
          datalabels: {
            display: true,
            color: "black",
            anchor: "end",
            align: "top"
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Range"
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number"
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
