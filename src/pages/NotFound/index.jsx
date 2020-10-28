import React from "react";
import { Link } from "react-router-dom";
import NotFoundPsyduck from "~/assets/img/not-found-psyduck.jpeg";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <img className="w-40" src={NotFoundPsyduck} alt="Psyduck's confused" />
      <span className="text-4xl font-light text-center text-gray-500 mt-4">
        Not found
      </span>
      <Link className="no-underline mt-2" to="/">
        <span className="text-blue-700 hover:text-blue-800 font-semibold uppercase">
          Home
        </span>
      </Link>
    </div>
  );
}
