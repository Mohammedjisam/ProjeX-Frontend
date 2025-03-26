// src/components/auth/SubmitButton.tsx
import { ReactNode } from 'react';

interface SubmitButtonProps {
  submitting: boolean;
  icon: ReactNode;
  text: string;
}

const SubmitButton = ({ submitting, icon, text }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={submitting}
    className={`w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors duration-300 ${
      submitting ? 'opacity-70 cursor-not-allowed' : ''
    }`}
  >
    {submitting ? (
      <>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </>
    ) : (
      <>
        {icon}
        {text}
      </>
    )}
  </button>
);

export default SubmitButton;