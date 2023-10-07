import { useState, useEffect } from 'react';

export type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); 

    return () => {
      clearTimeout(timer); 
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="fixed top-0 right-0 p-4 m-4 bg-red-500 text-white rounded-lg shadow-md z-50">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{message}</p>
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          &#10006;
        </button>
      </div>
    </div>
  ) : null;
};

export default ErrorMessage;
