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
import { BarChart, LineChart, Loader2 } from "lucide-react";

// Types for the transformed data
interface CountryData {
  country: string;
  metricTons: number;
  population: number;
  gdpPerCapita: number;
  itemsPerCapita: number;
  gdpPerCapitaPerItem: number;
}

interface ApiResponse {
  success: boolean;
  usingFallback?: boolean;
  error?: string;
  data: {
    receiving: CountryData[];
    sending: CountryData[];
  };
  receivingCountries?: CountryData[];
  sendingCountries?: CountryData[];
}

export function DataVisualization() {
  const [activeTab, setActiveTab] = useState("receiving");
  const [chartType, setChartType] = useState<"bar" | "comparison">("bar");
  const [receivingCountries, setReceivingCountries] = useState<CountryData[]>([]);
  const [sendingCountries, setSendingCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Fetch data from our API route
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);
        
        // Use our Next.js API route
        const response = await fetch('/api/test-drupal?type=clothing_trade');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiResponse: ApiResponse = await response.json();
        
        if (!apiResponse.success) {
          throw new Error(apiResponse.error || 'Failed to fetch data');
        }
        
        // Handle both possible response formats
        const receivingData = apiResponse.data?.receiving || apiResponse.receivingCountries || [];
        const sendingData = apiResponse.data?.sending || apiResponse.sendingCountries || [];
        
        setReceivingCountries(receivingData);
        setSendingCountries(sendingData);
        setUsingFallback(apiResponse.usingFallback || false);
        
        if (apiResponse.error) {
          setError(apiResponse.error);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        
        // If our API route fails completely, we could still have a client-side fallback
        // but the API route should handle this with its own fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && !loading) {
      // Clear previous chart
      d3.select(chartRef.current).selectAll("*").remove();

      const data = activeTab === "receiving" ? receivingCountries : sendingCountries;

      if (data.length > 0) {
        if (chartType === "bar") {
          renderBarChart(data);
        } else {
          renderComparisonChart(data);
        }
      }
    }
  }, [activeTab, chartType, receivingCountries, sendingCountries, loading]);

  const renderBarChart = (data: CountryData[]) => {
    const width = chartRef.current!.clientWidth;
    const height = 450;
    const margin = { top: 30, right: 40, bottom: 80, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Add subtle background gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "backgroundGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f8fafc")
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ffffff")
      .attr("stop-opacity", 1);

    // Background
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#backgroundGradient)");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerWidth])
      .padding(0.3);

    // Y scale
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.metricTons) as number])
      .nice()
      .range([innerHeight, 0]);

    // Color scale for bars
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.country))
      .range(
        activeTab === "receiving"
          ? ["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"] // Warm colors for receiving
          : ["#10b981", "#3b82f6", "#6366f1", "#f59e0b"]
      ); // Cool colors for sending

    // Add grid lines
    g.selectAll(".grid-line")
      .data(y.ticks(6))
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151");

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#6b7280");

    // Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -70)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151")
      .text("Metric Tons of Clothes");

    // Bars with animation and hover effects
    const bars = g
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.country) as number)
      .attr("y", innerHeight)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d) => colorScale(d.country) as string)
      .attr("rx", 4)
      .attr("ry", 4)
      .style("cursor", "pointer")
      .style("transition", "all 0.3s ease");

    // Animate bars
    bars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => y(d.metricTons))
      .attr("height", (d) => innerHeight - y(d.metricTons));

    // Add hover effects
    bars
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.8)
          .attr("transform", "scale(1.02)");

        // Tooltip
        const tooltip = g
          .append("g")
          .attr("class", "tooltip")
          .attr(
            "transform",
            `translate(${x(d.country)! + x.bandwidth() / 2}, ${
              y(d.metricTons) - 10
            })`
          );

        const tooltipBg = tooltip
          .append("rect")
          .attr("fill", "#1f2937")
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("opacity", 0.9);

        const tooltipText = tooltip
          .append("text")
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .style("font-size", "12px")
          .style("font-weight", "600")
          .text(`${d.metricTons.toLocaleString()} tons`);

        const bbox = tooltipText.node()!.getBBox();
        tooltipBg
          .attr("x", bbox.x - 8)
          .attr("y", bbox.y - 4)
          .attr("width", bbox.width + 16)
          .attr("height", bbox.height + 8);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .attr("transform", "scale(1)");

        g.select(".tooltip").remove();
      });

    // Add value labels on top of bars
    g.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", (d) => (x(d.country) as number) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.metricTons) - 8)
      .attr("text-anchor", "middle")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", "#6b7280")
      .text((d) => `${(d.metricTons / 1000).toFixed(0)}K`)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 500)
      .style("opacity", 1);
  };

  const renderComparisonChart = (data: CountryData[]) => {
    const width = chartRef.current!.clientWidth;
    const height = 450;
    const margin = { top: 30, right: 100, bottom: 80, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Add subtle background gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "backgroundGradient2")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f8fafc")
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ffffff")
      .attr("stop-opacity", 1);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#backgroundGradient2)");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerWidth])
      .padding(0.3);

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

    // Add grid lines
    g.selectAll(".grid-line")
      .data(yGdp.ticks(6))
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", (d) => yGdp(d))
      .attr("y2", (d) => yGdp(d))
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 1)
      .attr("opacity", 0.7);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#374151");

    // Left Y axis (GDP)
    g.append("g")
      .call(d3.axisLeft(yGdp))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#0ea5e9");

    // Right Y axis (Items)
    g.append("g")
      .attr("transform", `translate(${innerWidth}, 0)`)
      .call(d3.axisRight(yItems))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#f59e0b");

    // Left Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -70)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#0ea5e9")
      .text("GDP Per Capita ($)");

    // Right Y axis label
    g.append("text")
      .attr("transform", "rotate(90)")
      .attr("y", -width + 40)
      .attr("x", innerHeight / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "#f59e0b")
      .text("Items Per Capita");

    // GDP bars
    const gdpBars = g
      .selectAll(".bar-gdp")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-gdp")
      .attr("x", (d) => (x(d.country) as number) + x.bandwidth() / 6)
      .attr("y", innerHeight)
      .attr("width", x.bandwidth() / 3)
      .attr("height", 0)
      .attr("fill", "#0ea5e9")
      .attr("rx", 3)
      .attr("ry", 3)
      .style("cursor", "pointer");

    // Items bars
    const itemsBars = g
      .selectAll(".bar-items")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-items")
      .attr("x", (d) => (x(d.country) as number) + x.bandwidth() / 2)
      .attr("y", innerHeight)
      .attr("width", x.bandwidth() / 3)
      .attr("height", 0)
      .attr("fill", "#f59e0b")
      .attr("rx", 3)
      .attr("ry", 3)
      .style("cursor", "pointer");

    // Animate GDP bars
    gdpBars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("y", (d) => yGdp(d.gdpPerCapita))
      .attr("height", (d) => innerHeight - yGdp(d.gdpPerCapita));

    // Animate Items bars
    itemsBars
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 200)
      .attr("y", (d) => yItems(d.itemsPerCapita))
      .attr("height", (d) => innerHeight - yItems(d.itemsPerCapita));

    // Enhanced Legend with better positioning and styling
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 160}, 40)`);

    // Legend background
    legend
      .append("rect")
      .attr("width", 140)
      .attr("height", 70)
      .attr("fill", "rgba(255, 255, 255, 0.9)")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-width", 1)
      .attr("rx", 6)
      .attr("ry", 6);

    legend
      .append("rect")
      .attr("x", 10)
      .attr("y", 15)
      .attr("width", 18)
      .attr("height", 12)
      .attr("fill", "#0ea5e9")
      .attr("rx", 2);

    legend
      .append("text")
      .attr("x", 35)
      .attr("y", 25)
      .text("GDP Per Capita")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .style("fill", "#374151");

    legend
      .append("rect")
      .attr("x", 10)
      .attr("y", 40)
      .attr("width", 18)
      .attr("height", 12)
      .attr("fill", "#f59e0b")
      .attr("rx", 2);

    legend
      .append("text")
      .attr("x", 35)
      .attr("y", 50)
      .text("Items Per Capita")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .style("fill", "#374151");
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-[400px]"
          >
            <TabsList className="bg-white shadow-sm border border-gray-200">
              <TabsTrigger
                value="receiving"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white font-semibold transition-all duration-200"
              >
                Receiving Countries
              </TabsTrigger>
              <TabsTrigger
                value="sending"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white font-semibold transition-all duration-200"
              >
                Sending Countries
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex space-x-2">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
              disabled={loading}
              className={
                chartType === "bar"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:from-emerald-600 hover:to-teal-700"
                  : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }
            >
              <BarChart className="h-4 w-4 mr-1" />
              Volume
            </Button>
            <Button
              variant={chartType === "comparison" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("comparison")}
              disabled={loading}
              className={
                chartType === "comparison"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:from-emerald-600 hover:to-teal-700"
                  : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }
            >
              <LineChart className="h-4 w-4 mr-1" />
              Economic Impact
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="w-full h-[450px] flex items-center justify-center rounded-lg bg-gray-50">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              <p className="text-gray-600 font-medium">Loading data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full h-[450px] flex items-center justify-center rounded-lg bg-red-50 border border-red-200">
            <div className="text-center">
              <p className="text-red-600 font-medium mb-2">⚠️ API Connection Error</p>
              <p className="text-red-500 text-sm">Using fallback data. Error: {error}</p>
            </div>
          </div>
        ) : (
          <div
            ref={chartRef}
            className="w-full h-[450px] rounded-lg overflow-hidden"
          />
        )}
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-gray-50 rounded-lg border border-green-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-800">
              {activeTab === "receiving"
                ? "📥 Impact on Receiving Countries: "
                : "📤 Export Volume from Sending Countries: "}
            </span>
            {activeTab === "receiving"
              ? "These visualizations reveal how second-hand clothing imports affect developing economies, showing the relationship between trade volume, economic indicators, and per-capita impact across communities."
              : "Data illustrates the massive scale of clothing exports from developed nations, highlighting the global fashion redistribution system and its economic implications for both sending and receiving regions."}
          </p>
          {error && (
            <p className="text-xs text-amber-600 mt-2">
              🔄 Currently displaying fallback data due to API connectivity issues.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}