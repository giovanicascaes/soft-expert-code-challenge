import React from 'react'
import LoadingMoreGif from  "~/assets/img/loading-more.gif"

export default function LoadingMore() {
  return (
    <img
      className="h-24"
      src={LoadingMoreGif}
      alt="Loading more animated GIF"
    />
  );
}
