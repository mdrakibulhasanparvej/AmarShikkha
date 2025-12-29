import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="relative mb-3">
        {/* Outer Ring */}
        <div className="animate-spin h-16 w-16 rounded-full border-4 border-t-transparent border-[#34c902]"></div>

        {/* Inner Glow */}
        <div className="absolute inset-2 rounded-full bg-[#027CE7]/50 blur-md"></div>
      </div>

      {/* Optional message */}
      {message && (
        <p className="text-white text-sm font-medium tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
