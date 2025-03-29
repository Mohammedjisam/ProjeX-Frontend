interface TaskDescriptionProps {
    description: string;
  }
  
  const TaskDescription = ({ description }: TaskDescriptionProps) => (
    <div>
      <h3 className="text-white font-medium mb-2">Description</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
  
  export default TaskDescription;