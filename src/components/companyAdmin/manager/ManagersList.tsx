// src/pages/companyadmin/managers/components/ManagersList.tsx
import React from 'react';
import { Manager } from '../../../types/Manager/Manager';
import EmptyState from './EmptyState';

interface ManagersListProps {
  managers: Manager[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ManagersList: React.FC<ManagersListProps> = ({ 
  managers, 
  onAdd, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="w-full bg-gray-800/40 rounded-lg overflow-hidden shadow-lg border border-white/5">
      <div className="p-4 flex justify-between items-center border-b border-white/5">
        <h2 className="text-xl font-semibold text-white">Managers</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          Add Manager
        </button>
      </div>
      
      {managers.length === 0 ? (
        <EmptyState />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-white/80 text-sm">
              <th className="py-4 px-6 text-left font-medium">NO</th>
              <th className="py-4 px-6 text-left font-medium">Manager Name</th>
              <th className="py-4 px-6 text-left font-medium">Email</th>
              <th className="py-4 px-6 text-left font-medium">Phone No</th>
              <th className="py-4 px-6 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager, index) => (
              <tr 
                key={manager._id} 
                className="border-t border-white/5 hover:bg-gray-700/50 transition-colors duration-150"
              >
                <td className="py-4 px-6 text-gray-300">{index + 1}</td>
                <td className="py-4 px-6 text-white">{manager.name}</td>
                <td className="py-4 px-6 text-gray-300">{manager.email}</td>
                <td className="py-4 px-6 text-gray-300">{manager.phoneNumber}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => onEdit(manager._id)} 
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(manager._id)} 
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagersList;