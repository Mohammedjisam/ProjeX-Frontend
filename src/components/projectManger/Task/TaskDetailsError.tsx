// TaskDetailsError.tsx
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface TaskDetailsErrorProps {
  error: Error;
  onRetry: () => void;
}

export const TaskDetailsError = ({ error, onRetry }: TaskDetailsErrorProps) => {
  return (
    <Card className="bg-[#252b3b] border-gray-700">
      <CardContent className="pt-6">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-700"
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};