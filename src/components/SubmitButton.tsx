import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isSubmitting, 
  text, 
  loadingText = 'Submitting...' 
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full px-6 py-3 bg-blue-500 text-white rounded-lg transition-colors relative ${
        isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-600'
      }`}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
          {loadingText}
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;