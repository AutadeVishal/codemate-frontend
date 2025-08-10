import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Something went wrong</h1>
        <p className="mt-4 text-lg text-gray-700">We're sorry, but an unexpected error occurred.</p>
        <p className="mt-2 text-gray-500">Please try again later.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
