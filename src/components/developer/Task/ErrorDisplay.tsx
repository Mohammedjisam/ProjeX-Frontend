import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => (
  <div className="flex min-h-screen">
    <div className="flex-1 p-6">
      <Card className="bg-[#252b3b] border-gray-700 max-w-7xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-red-400 py-8">
            <p>{error}</p>
            <Button
              variant="outline"
              className="mt-4 border-gray-700 text-white hover:bg-gray-700"
              onClick={onRetry}
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ErrorDisplay;