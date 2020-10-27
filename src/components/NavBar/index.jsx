import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PokemonLogo from "~/assets/img/pokemon-logo.png";

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row items-center shadow-flat-md px-8 py-4 space-x-8">
      <img className="h-16" src={PokemonLogo} alt="Pokémon Logo" />
      {location.pathname !== "/" && (
        <NavLink className="no-underline mt-8 md:mt-0" to="/">
          <span className="flex items-center text-lg text-blue-700 hover:text-blue-800 font-semibold uppercase mx-2">
            <span className="mr-2 text-lg">&#10094;</span>Back
          </span>
        </NavLink>
      )}
    </div>
  );
}
