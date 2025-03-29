import { Skeleton } from "../../../components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

const SkeletonLoader = () => (
  <div className="flex min-h-screen">
    <div className="flex-1 p-6">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-40 bg-gray-700" />
          <Skeleton className="h-6 w-24 bg-gray-700 rounded-full" />
        </div>

        <Card className="bg-[#252b3b] border-gray-700">
          <CardHeader>
            <Skeleton className="h-7 w-64 bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-700" />
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
            <Skeleton className="h-6 w-full bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-700" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;