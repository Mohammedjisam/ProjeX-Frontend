// TaskDetailsSkeleton.tsx
import { Skeleton } from "../../../components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

export const TaskDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-40 bg-gray-700" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
          <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
        </div>
      </div>

      <Card className="bg-[#252b3b] border-gray-700">
        <CardHeader>
          <Skeleton className="h-7 w-64 bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <Skeleton className="h-5 w-5 bg-gray-700" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-700" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};