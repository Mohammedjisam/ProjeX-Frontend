import { TabsContent } from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { Clock } from "lucide-react";

const ActivityTab = () => (
  <TabsContent value="activity">
    <Card className="bg-[#252b3b] border-gray-700 mt-6">
      <CardContent className="pt-6">
        <div className="text-center text-gray-400 py-8">
          <Clock className="mx-auto h-12 w-12 opacity-20 mb-2" />
          <p>Activity log coming soon</p>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);

export default ActivityTab;