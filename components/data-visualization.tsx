"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart } from "lucide-react";

// Data from the provided table
const receivingCountries = [
  {
    country: "Mozambique",
    metricTons: 191570,
    population: 32163040,
    gdpPerCapita: 500,
    itemsPerCapita: 31,
    gdpPerCapitaPerItem: 16,
  },
  {
    country: "Ghana",
    metricTons: 149181,
    population: 31732130,
    gdpPerCapita: 2445,
    itemsPerCapita: 25,
    gdpPerCapitaPerItem: 99,
  },
  {
    country: "Togo",
    metricTons: 63042,
    population: 8478240,
    gdpPerCapita: 992,
    itemsPerCapita: 39,
    gdpPerCapitaPerItem: 25,
  },
  {
    country: "Haiti",
    metricTons: 26233,
    population: 11541680,
    gdpPerCapita: 1815,
    itemsPerCapita: 12,
    gdpPerCapitaPerItem: 152,
  },
];

const sendingCountries = [
  {
    country: "USA",
    metricTons: 720846,
    population: 331893740,
    gdpPerCapita: 69288,
    itemsPerCapita: 11,
    gdpPerCapitaPerItem: 6076,
  },
  {
    country: "Germany",
    metricTons: 436426,
    population: 83129290,
    gdpPerCapita: 50802,
    itemsPerCapita: 28,
    gdpPerCapitaPerItem: 1843,
  },
  {
    country: "United Kingdom",
    metricTons: 335152,
    population: 67326570,
    gdpPerCapita: 47334,
    itemsPerCapita: 26,
    gdpPerCapitaPerItem: 1811,
  },
  {
    country: "France",
    metricTons: 157790,
    population: 67499340,
    gdpPerCapita: 43519,
    itemsPerCapita: 12,
    gdpPerCapitaPerItem: 3546,
  },
];

export function DataVisualization() {
  const [activeTab, setActiveTab] = useState("receiving");
  const [chartType, setChartType] = useState<"bar" | "comparison">("bar");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Clear previous chart
      d3.select(chartRef.current).selectAll("*").remove();

      const data =
        activeTab === "receiving" ? receivingCountries : sendingCountries;

      if (chartType === "bar") {
        renderBarChart(data);
      } else {
        renderComparisonChart(data);
      }
    }
  }, [activeTab, chartType]);

  const renderBarChart = (data: typeof receivingCountries) => {
    const width = chartRef.current!.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerWidth])
      .padding(0.2);

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.metricTons) as number])
      .nice()
      .range([innerHeight, 0]);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em");

    // Y axis
    g.append("g").call(d3.axisLeft(y));

    // Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Metric Tons of Clothes");

    // Bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.country) as number)
      .attr("y", (d) => y(d.metricTons))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.metricTons))
      .attr("fill", "#3b82f6");
  };

  const renderComparisonChart = (data: typeof receivingCountries) => {
    const width = chartRef.current!.clientWidth;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerWidth])
      .padding(0.2);

    // Y scale for GDP per capita
    const yGdp = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.gdpPerCapita) as number])
      .nice()
      .range([innerHeight, 0]);

    // Y scale for items per capita
    const yItems = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.itemsPerCapita) as number])
      .nice()
      .range([innerHeight, 0]);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em");

    // Left Y axis (GDP)
    g.append("g").call(d3.axisLeft(yGdp));

    // Right Y axis (Items)
    g.append("g")
      .attr("transform", `translate(${innerWidth}, 0)`)
      .call(d3.axisRight(yItems));

    // Left Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("GDP Per Capita ($)");

    // Right Y axis label
    g.append("text")
      .attr("transform", "rotate(90)")
      .attr("y", -width + 20)
      .attr("x", innerHeight / 2)
      .attr("text-anchor", "middle")
      .text("Items Per Capita");

    // GDP bars
    g.selectAll(".bar-gdp")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-gdp")
      .attr("x", (d) => (x(d.country) as number) + x.bandwidth() / 4)
      .attr("y", (d) => yGdp(d.gdpPerCapita))
      .attr("width", x.bandwidth() / 4)
      .attr("height", (d) => innerHeight - yGdp(d.gdpPerCapita))
      .attr("fill", "#3b82f6");

    // Items bars
    g.selectAll(".bar-items")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-items")
      .attr("x", (d) => (x(d.country) as number) + x.bandwidth() / 2)
      .attr("y", (d) => yItems(d.itemsPerCapita))
      .attr("width", x.bandwidth() / 4)
      .attr("height", (d) => innerHeight - yItems(d.itemsPerCapita))
      .attr("fill", "#ef4444");

    // Legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 120}, 20)`);

    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#3b82f6");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 12.5)
      .text("GDP Per Capita")
      .style("font-size", "12px");

    legend
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("y", 20)
      .attr("fill", "#ef4444");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 32.5)
      .text("Items Per Capita")
      .style("font-size", "12px");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Global Clothing Trade Data</CardTitle>
        <CardDescription>
          Visualization of clothing import and export data across countries
        </CardDescription>
        <div className="flex justify-between items-center">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="receiving">Receiving Countries</TabsTrigger>
              <TabsTrigger value="sending">Sending Countries</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex space-x-2">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
            >
              <BarChart className="h-4 w-4 mr-1" />
              Metric Tons
            </Button>
            <Button
              variant={chartType === "comparison" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("comparison")}
            >
              <LineChart className="h-4 w-4 mr-1" />
              Comparison
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="w-full h-[400px]" />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            {activeTab === "receiving"
              ? "Data shows the impact of second-hand clothing imports on receiving countries."
              : "Data shows the volume of second-hand clothing exports from sending countries."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
