import { Calendar, Check, ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { useState } from "react";

interface PriorityOption {
  value: "low" | "medium" | "high" | "urgent";
  label: string;
  color: string;
}

interface TaskFormProps {
  formData: {
    title: string;
    description: string;
    assignee: string;
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string;
    remarks: string;
  };
  developers: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  errors: Record<string, string>;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPrioritySelect: (priority: "low" | "medium" | "high" | "urgent") => void;
  onAssigneeSelect: (assigneeId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const priorityOptions: PriorityOption[] = [
  { value: "low", label: "Low", color: "bg-blue-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "urgent", label: "Urgent", color: "bg-red-500" },
];

export const TaskForm = ({
  formData,
  developers,
  errors,
  loading,
  onChange,
  onPrioritySelect,
  onAssigneeSelect,
  onSubmit
}: TaskFormProps) => {
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  const getPriorityColor = (priority: string) => {
    return priorityOptions.find((option) => option.value === priority)?.color || "bg-blue-500";
  };

  const getPriorityLabel = (priority: string) => {
    return priorityOptions.find((option) => option.value === priority)?.label || "Medium";
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Title */}
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter Task Title"
            error={errors.title}
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Priority */}
        <div className="col-span-2 md:col-span-1 relative">
          <Label>Priority</Label>
          <button
            type="button"
            onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
          >
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getPriorityColor(formData.priority)}`}></span>
              {getPriorityLabel(formData.priority)}
            </div>
            <ChevronDown size={18} />
          </button>

          {showPriorityDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg">
              {priorityOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-3 py-2 hover:bg-gray-600 cursor-pointer flex items-center"
                  onClick={() => {
                    onPrioritySelect(option.value);
                    setShowPriorityDropdown(false);
                  }}
                >
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${option.color}`}></span>
                  {option.label}
                  {formData.priority === option.value && <Check size={16} className="ml-auto" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Description */}
        <div className="col-span-2">
          <Label htmlFor="description">Task Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Enter Task Description"
            rows={4}
            error={errors.description}
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
        </div>

        {/* Due Date */}
        <div className="col-span-2 md:col-span-1 relative">
          <Label htmlFor="dueDate">Due Date</Label>
          <div className="relative">
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={onChange}
              error={errors.dueDate}
            />
            <Calendar
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {errors.dueDate && <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>}
        </div>

        {/* Assignee */}
        <div className="col-span-2 md:col-span-1 relative">
          <Label>Assignee</Label>
          <button
            type="button"
            onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
            className={`w-full flex items-center justify-between px-3 py-2 bg-gray-700 border ${errors.assignee ? "border-red-500" : "border-gray-600"} rounded-md text-white`}
          >
            {formData.assignee
              ? developers.find((dev) => dev._id === formData.assignee)?.name || "Select a developer"
              : "Select a developer"}
            <ChevronDown size={18} />
          </button>

          {showAssigneeDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {developers.map((developer) => (
                <div
                  key={developer._id}
                  className="px-3 py-2 hover:bg-gray-600 cursor-pointer flex items-center"
                  onClick={() => {
                    onAssigneeSelect(developer._id);
                    setShowAssigneeDropdown(false);
                  }}
                >
                  {developer.name}
                  {formData.assignee === developer._id && <Check size={16} className="ml-auto" />}
                </div>
              ))}
            </div>
          )}
          {errors.assignee && <p className="text-sm text-red-500 mt-1">{errors.assignee}</p>}
        </div>

        {/* Remarks */}
        <div className="col-span-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={onChange}
            placeholder="Add remarks..."
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating Task..." : "Create Task"}
          </Button>
        </div>
      </div>
    </form>
  );
};