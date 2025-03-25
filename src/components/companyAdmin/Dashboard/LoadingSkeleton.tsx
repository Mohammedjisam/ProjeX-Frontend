// src/components/dashboard/LoadingSkeleton.tsx
import React from "react";

interface LoadingSkeletonProps {
  count: number;
  type: "manager" | "project";
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count,
  type,
}) => (
  <div
    className={`grid ${
      type === "manager"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
    } gap-6`}
  >
    {Array(count)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 animate-pulse h-48"
        >
          <div className="h-6 bg-gray-600 rounded w-40 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="flex items-center space-x-3 mt-6">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      ))}
  </div>
);
