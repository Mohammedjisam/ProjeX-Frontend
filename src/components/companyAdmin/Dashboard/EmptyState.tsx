// src/components/dashboard/EmptyState.tsx
import React from 'react';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="col-span-full text-center py-8 text-gray-400">
    {message}
  </div>
);