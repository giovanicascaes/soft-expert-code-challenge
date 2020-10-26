import React from "react";
import LoadingGif from "~/assets/img/loading.gif";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <img className="h-24" src={LoadingGif} alt="Loading animated GIF" />
        <span className="font-thin text-lg text-center">Loading...</span>
      </div>
    </div>
  );
}
