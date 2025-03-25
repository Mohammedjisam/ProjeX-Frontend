// src/pages/companyadmin/managers/components/LoadingState.tsx
import React from 'react';

const LoadingState: React.FC = () => (
  <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5 animate-pulse p-10 flex justify-center">
    <div className="text-white">Loading managers...</div>
  </div>
);

export default LoadingState;