import { DataVisualization } from "@/components/data-visualization";

export default function DataPage() {
  return (
    <div className="w-full flex justify-center px-4 md:px-8 py-10">
      <div className="w-full max-w-4xl flex flex-col gap-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Data Visualization
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Explore the global impact of second-hand clothing trade through
            interactive visualizations.
          </p>
        </div>

        {/* Visualization */}
        <div className="w-full">
          <div className="border rounded-xl shadow-md p-4 sm:p-6 bg-white">
            <DataVisualization />
          </div>
        </div>

        {/* Explanatory Text */}
        <div className="prose prose-neutral text-gray-800 max-w-none">
          <h2 className="text-2xl font-semibold mb-2">
            Understanding the Data
          </h2>
          <p>
            The visualizations above represent the flow of second-hand clothing
            between sending and receiving countries. This data highlights the
            significant disparities in volume, economic impact, and per-capita
            metrics between these countries.
          </p>

          <h3 className="text-xl font-semibold mt-6">Key Insights</h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>Volume Disparity:</strong> Countries like the USA and
              Germany export significantly more clothing by volume than what
              individual receiving countries import.
            </li>
            <li>
              <strong>Economic Impact:</strong> GDP per capita in sending
              countries is substantially higher, reflecting economic inequality
              in global clothing trade.
            </li>
            <li>
              <strong>Per Capita Metrics:</strong> Countries like Togo import
              more items per capita, suggesting the concentrated impact in
              smaller economies.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Methodology</h3>
          <p>
            The data is based on trade statistics, population figures, and
            economic indicators. "Items Per Capita" is estimated from metric
            tonnage divided by population.
          </p>
          <p>
            "GDP Per Capita Per Imported/Exported Item" highlights the economic
            weight of each traded item on a per-person basis, exposing
            underlying inequality.
          </p>
        </div>
      </div>
    </div>
  );
}
