import { Card, CardContent } from "../../../components/ui/card";

const NotFoundDisplay = () => (
  <div className="flex min-h-screen">
    <div className="flex-1 p-6">
      <Card className="bg-[#252b3b] border-gray-700 max-w-7xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-gray-400 py-8">
            <p>Task not found</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default NotFoundDisplay;