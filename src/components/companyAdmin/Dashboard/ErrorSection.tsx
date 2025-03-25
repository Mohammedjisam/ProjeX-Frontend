// src/components/dashboard/ErrorSection.tsx
import React from 'react';

interface ErrorSectionProps {
  message: string;
  onRetry: () => void;
}

export const ErrorSection: React.FC<ErrorSectionProps> = ({ message, onRetry }) => (
  <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg p-6 text-center">
    <p className="text-red-400">{message}</p>
    <button 
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
    >
      Try Again
    </button>
  </div>
);