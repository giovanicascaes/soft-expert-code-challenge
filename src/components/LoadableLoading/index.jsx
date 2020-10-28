import React from "react";

const Message = ({ message, retry }) => (
  <div className="flex flex-1 flex-col items-center justify-center space-y-1">
    <span>{message}</span>
    {retry && (
      <span
        className="cursor-pointer text-blue-700 hover:text-blue-800"
        onClick={retry}
      >
        Retry?
      </span>
    )}
  </div>
);

export default function LoadableLoading({ pastDelay, error, timedOut, retry }) {
  if (!pastDelay) return null;
  if (error) return <Message message="Error loading page." retry={retry} />;
  if (timedOut) return <Message message="Taking too long..." retry={retry} />;
  return <Message message="Loading..." />;
}
