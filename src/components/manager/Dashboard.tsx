import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axiosInstance from "../../utils/AxiosConfig"; // Update this path

export function Dashboard() {
  // Animation states
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);
  
  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Fetch all projects
      const response = await axiosInstance.get("/project/getallprojects");
      
      if (response.data.success) {
        const allProjects = response.data.data;
        
        // Set main project cards (first 3 projects or all if less than 3)
        setProjects(allProjects.slice(0, 3));
        
        // Set recent projects (latest 2 by creation date)
        const sortedByDate = [...allProjects].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentProjects(sortedByDate.slice(0, 2));
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-gray-950 p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xl">Loading projects...</div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : (
            <div className={cn(
              "transition-all duration-500 transform",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <ProjectCard 
                      key={project._id} 
                      title={project.name}
                      progress={project.completionPercentage || 0}
                      delay={index * 100}
                      mounted={mounted}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Projects</h2>
                  <button 
                    className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => window.location.href = "/projects"}
                  >
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <RecentProjectItem 
                      key={project._id} 
                      title={project.name} 
                      date={new Date(project.startDate).toLocaleDateString()}
                      delay={300 + index * 100}
                      mounted={mounted}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  progress: number;
  delay: number;
  mounted: boolean;
}

function ProjectCard({ title, progress, delay, mounted }: ProjectCardProps) {
  return (
    <div 
      className={cn(
        "bg-blue-900/30 rounded-lg p-6 transition-all duration-500 transform border border-blue-900/50",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <div className="relative h-36 flex items-center justify-center">
        <svg className="w-32 h-32">
          <circle
            className="text-gray-700"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="58"
            cx="64"
            cy="64"
          />
          <circle
            className="text-blue-500"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="58"
            cx="64"
            cy="64"
            strokeDasharray={365}
            strokeDashoffset={365 - (365 * progress) / 100}
            transform="rotate(-90 64 64)"
          />
        </svg>
        <span className="absolute text-xl font-bold">{progress}%</span>
      </div>
    </div>
  );
}

interface RecentProjectProps {
  title: string;
  date: string;
  delay: number;
  mounted: boolean;
}

function RecentProjectItem({ title, date, delay, mounted }: RecentProjectProps) {
  return (
    <div 
      className={cn(
        "bg-gray-900/50 rounded-lg p-4 flex items-center justify-between border border-gray-800/50 transition-all duration-500",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-medium">{title}</h3>
      <div className="flex items-center text-gray-400 text-sm">
        <Calendar className="h-3.5 w-3.5 mr-1" />
        {date}
      </div>
    </div>
  );
}

export default Dashboard;