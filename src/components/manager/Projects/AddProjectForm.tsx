import React from 'react';
import { ProjectFormData, ProjectManager } from '../../../types/Manager/Project';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';

interface AddProjectFormProps {
  projectData: ProjectFormData;
  projectManagers: ProjectManager[];
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const AddProjectForm = ({
  projectData,
  projectManagers,
  isLoading,
  onChange,
  onSelectChange,
  onSubmit,
  onCancel
}: AddProjectFormProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-700 to-purple-700">
        <CardTitle className="text-white">Add New Project</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name*</Label>
              <Input
                id="name"
                name="name"
                value={projectData.name}
                onChange={onChange}
                placeholder="Enter Project Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Goal*</Label>
              <Input
                id="goal"
                name="goal"
                value={projectData.goal}
                onChange={onChange}
                placeholder="Define Goal of the project"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={onChange}
                rows={4}
                placeholder="Enter Description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name*</Label>
              <Input
                id="clientName"
                name="clientName"
                value={projectData.clientName}
                onChange={onChange}
                placeholder="Enter Client Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget*</Label>
              <Input
                type="number"
                id="budget"
                name="budget"
                value={projectData.budget}
                onChange={onChange}
                placeholder="Enter Project Budget"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date*</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={projectData.startDate}
                onChange={onChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date*</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={projectData.endDate}
                onChange={onChange}
                required
              />
            </div>

            {/* ✅ FIXED Project Manager Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="projectManager">Project Manager*</Label>
              <Select
                value={projectData.projectManager}
                onValueChange={(value) => onSelectChange('projectManager', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Manager" />
                </SelectTrigger>
                <SelectContent>
                  {projectManagers
                    ?.filter(manager => manager && manager.id && manager.name)
                    .map(manager => (
                      <SelectItem key={manager.id} value={manager.id}>
                        {manager.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={projectData.status}
                onValueChange={(value) => onSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                name="comments"
                value={projectData.comments || ''}
                onChange={onChange}
                rows={4}
                placeholder="Enter Comments"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
