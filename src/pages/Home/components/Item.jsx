import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "~/utils";

export default React.forwardRef(function Item({ name, onClick }, ref) {
  return (
    <Link
      className="text-lg p-2 text-gray-700 hover:text-yellow-500"
      to={`/pokemon/${name}`}
      onClick={onClick}
      ref={ref}
    >
      {capitalize(name)}
    </Link>
  );
});
