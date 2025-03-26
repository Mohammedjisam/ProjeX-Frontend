import { ProjectManager } from '../../../types/Manager/ProjectManager';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Loader2 } from 'lucide-react';

interface ProjectManagersTableProps {
  projectManagers: ProjectManager[];
  isLoading: boolean;
  error: Error | null;
  isDeleting: boolean;
  isToggling: boolean;
  onAddProjectManager: () => void;
  onEditProjectManager: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDeleteProjectManager: (id: string) => void;
}

export const ProjectManagersTable = ({
    projectManagers,
    isLoading,
    error,
    isDeleting,
    isToggling,
    onAddProjectManager,
    onEditProjectManager,
    onToggleStatus,
    onDeleteProjectManager
  }: ProjectManagersTableProps) => {
    if (isLoading) {
      return (
        <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5 animate-pulse p-10 flex justify-center">
          <div className="text-white">Loading project managers...</div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5 p-10 flex justify-center">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      );
    }
  
    return (
      <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5">
        {/* Header with original styling */}
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-semibold text-white">Project Managers</h2>
          <button
            onClick={onAddProjectManager}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
          >
            Add Project Manager
          </button>
        </div>
  
        {/* Rest of the table remains exactly the same */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-white/80 text-sm">
              <th className="py-4 px-6 text-left font-medium">NO</th>
              <th className="py-4 px-6 text-left font-medium">PM Name</th>
              <th className="py-4 px-6 text-left font-medium">Email</th>
              <th className="py-4 px-6 text-left font-medium">Phone No</th>
              <th className="py-4 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {projectManagers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No project managers found
                </td>
              </tr>
            ) : (
              projectManagers.map((pm, index) => (
                <tr 
                  key={pm._id} 
                  className="border-t border-white/5 hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-gray-300">{index + 1}</td>
                  <td className="py-4 px-6 text-white">{pm.name}</td>
                  <td className="py-4 px-6 text-gray-300">{pm.email}</td>
                  <td className="py-4 px-6 text-gray-300">{pm.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => onEditProjectManager(pm._id)} 
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onToggleStatus(pm._id)} 
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                      >
                        Block
                      </button>
                      <button 
                        onClick={() => onDeleteProjectManager(pm._id)} 
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };