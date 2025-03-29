interface TaskRemarksProps {
    remarks: string;
  }
  
  const TaskRemarks = ({ remarks }: TaskRemarksProps) => (
    <div>
      <h3 className="text-white font-medium mb-2">Remarks</h3>
      <p className="text-gray-300">{remarks}</p>
    </div>
  );
  
  export default TaskRemarks;