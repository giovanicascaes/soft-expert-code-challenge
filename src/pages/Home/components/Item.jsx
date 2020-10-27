import React from "react";
import { Link } from "react-router-dom";

export default React.forwardRef(function Item({ name, onClick }, ref) {
  return (
    <Link
      className="text-lg p-2 text-gray-700 hover:text-yellow-550"
      to={`/pokemon/${name}`}
      onClick={onClick}
      ref={ref}
    >
      {name.substr(0, 1).toUpperCase() + name.substr(1)}
    </Link>
  );
});
