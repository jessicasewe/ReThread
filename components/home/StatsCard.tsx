"use client";

interface StatsCardProps {
  value: string;
  label: string;
}

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-green-800">{label}</div>
    </div>
  );
}
