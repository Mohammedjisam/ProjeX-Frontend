export const ErrorState = ({ message = "An error occurred" }: { message?: string }) => (
    <div className="flex justify-center items-center h-full">
      <div className="text-white text-xl">{message}</div>
    </div>
  );