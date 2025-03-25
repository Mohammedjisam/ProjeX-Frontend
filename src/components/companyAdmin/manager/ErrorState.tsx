// src/pages/companyadmin/managers/components/ErrorState.tsx
import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5 p-6 flex flex-col items-center">
    <div className="text-red-500 mb-4">Error: {error}</div>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
    >
      Retry
    </button>
  </div>
);

export default ErrorState;