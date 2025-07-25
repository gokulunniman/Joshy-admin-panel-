export default function ChartPlaceholder() {
  return (
    <div className="w-full h-64 bg-white rounded-lg shadow flex items-center justify-center text-gray-500 mb-6">
      {/* TODO: Replace with real chart component (e.g., Recharts, Chart.js) */}
      <div className="text-center">
        <div className="text-lg font-medium">Chart goes here</div>
        <div className="text-sm text-gray-400 mt-1">Analytics visualization</div>
      </div>
    </div>
  );
}