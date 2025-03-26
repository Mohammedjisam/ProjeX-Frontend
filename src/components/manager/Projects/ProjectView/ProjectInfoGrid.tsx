// src/components/manager/ProjectView/ProjectInfoGrid.tsx
import { Calendar, Flag, Users } from "lucide-react";
import { ProjectDetails } from "../../../../types/Manager/Project";
import { format } from "date-fns";

const getStatusColor = (status: string) => {
  switch (status) {
    case "planned": return "bg-blue-500";
    case "in-progress": return "bg-amber-500";
    case "completed": return "bg-green-500";
    case "on-hold": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

export const ProjectInfoGrid = ({ project }: { project: ProjectDetails }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="bg-blue-800/50 p-3 rounded-md">
      <div className="text-blue-300 text-sm mb-1 flex items-center">
        <Calendar size={14} className="mr-1" />
        Start Date
      </div>
      <div className="text-white">{format(new Date(project.startDate), "PP")}</div>
    </div>
    <div className="bg-blue-800/50 p-3 rounded-md">
      <div className="text-blue-300 text-sm mb-1 flex items-center">
        <Calendar size={14} className="mr-1" />
        End Date
      </div>
      <div className="text-white">{format(new Date(project.endDate), "PP")}</div>
    </div>
    <div className="bg-blue-800/50 p-3 rounded-md">
      <div className="text-blue-300 text-sm mb-1">₹ Budget</div>
      <div className="text-white">₹ {project.budget.toLocaleString()}</div>
    </div>
    <div className="bg-blue-800/50 p-3 rounded-md">
      <div className="text-blue-300 text-sm mb-1 flex items-center">
        <Flag size={14} className="mr-1" />
        Status
      </div>
      <div className="flex items-center">
        <span className={`${getStatusColor(project.status)} w-2 h-2 rounded-full mr-2`}></span>
        <span className="text-white capitalize">{project.status.replace("-", " ")}</span>
      </div>
    </div>
    <div className="bg-blue-800/50 p-3 rounded-md">
      <div className="text-blue-300 text-sm mb-1 flex items-center">
        <Users size={14} className="mr-1" />
        Verification
      </div>
      <div className="flex items-center">
        <span className={`${project.companyAdminIsVerified ? "bg-green-500" : "bg-yellow-500"} w-2 h-2 rounded-full mr-2`}></span>
        <span className="text-white">
          {project.companyAdminIsVerified ? "Verified" : "Pending"}
        </span>
      </div>
    </div>
  </div>
);