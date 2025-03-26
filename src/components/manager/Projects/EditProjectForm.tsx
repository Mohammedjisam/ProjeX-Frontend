import React from "react";
import { ProjectFormData, ProjectManager } from "../../../types/Manager/Project";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface EditProjectFormProps {
  initialData: ProjectFormData;
  managers: ProjectManager[];
  isLoading: boolean;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

export const EditProjectForm = ({
  initialData,
  managers,
  isLoading,
  onSubmit,
  onCancel,
}: EditProjectFormProps) => {
  const [formData, setFormData] = React.useState<ProjectFormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Project Name*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="goal">Goal*</Label>
          <Input
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="clientName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Client Name*
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
            placeholder="Enter Client Name"
            required
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Budget*
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 placeholder-gray-500"
            placeholder="Enter Project Budget"
            min="0"
            required
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Start Date*
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            End Date*
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
            required
          />
        </div>

        <div>
          <Label htmlFor="projectManager">Project Manager*</Label>
          <Select
            value={formData.projectManager}
            onValueChange={(value) =>
              handleSelectChange("projectManager", value)
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              {managers.map((manager) => (
                <SelectItem key={manager._id} value={manager._id}>
                  {manager.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
