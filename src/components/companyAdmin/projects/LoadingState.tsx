// src/pages/companyadmin/projects/components/LoadingState.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
  </div>
);

export default LoadingState;