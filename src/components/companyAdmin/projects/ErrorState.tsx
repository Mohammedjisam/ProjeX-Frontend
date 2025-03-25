// src/pages/companyadmin/projects/components/ErrorState.tsx
import React from 'react';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => (
  <div className="bg-red-900/30 border border-red-800 text-red-300 p-4 rounded-md">
    <p>{error}</p>
  </div>
);

export default ErrorState;