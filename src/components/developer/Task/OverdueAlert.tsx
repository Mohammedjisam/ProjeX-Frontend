import { Card, CardContent } from "../../../components/ui/card";
import { AlertTriangle } from "lucide-react";
import { formatTaskDate } from "./taskUtils";

interface OverdueAlertProps {
  dueDate: string;
}

const OverdueAlert = ({ dueDate }: OverdueAlertProps) => (
  <Card className="bg-[#2b2535] border-red-900">
    <CardContent className="pt-6">
      <div className="flex items-center space-x-3 text-red-400">
        <AlertTriangle className="h-5 w-5" />
        <p className="font-medium">This task is overdue</p>
      </div>
      <p className="text-gray-300 mt-2 text-sm">
        The due date was {formatTaskDate(dueDate)}. Please update the status or extend the deadline.
      </p>
    </CardContent>
  </Card>
);

export default OverdueAlert;