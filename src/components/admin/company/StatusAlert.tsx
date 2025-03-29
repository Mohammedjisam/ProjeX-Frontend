interface StatusAlertProps {
    type: 'success' | 'error';
    message: string;
    onRetry?: () => void;
  }
  
  export function StatusAlert({ type, message, onRetry }: StatusAlertProps) {
    const alertClasses = {
      success: 'bg-green-900/30 border-green-800 text-green-300',
      error: 'bg-red-900/30 border-red-800 text-red-300'
    };
  
    return (
      <div className={`border rounded-md p-4 ${alertClasses[type]}`}>
        <p>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    );
  }