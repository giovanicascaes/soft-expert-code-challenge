import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PokemonLogo from "~/assets/img/pokemon-logo.png";

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="flex items-center shadow-md px-8 py-4 space-x-8">
      <img className="h-16" src={PokemonLogo} alt="Pokémon Logo" />
      {location.pathname !== "/" && (
        <NavLink className="no-underline" to="/">
          <span
            className={
              "flex items-center text-lg text-yellow-500 font-semibold mx-2 " +
              styles["hover:text-yellow-600"]
            }
          >
            <span className="mr-2 text-xl">&#10094;</span>Back
          </span>
        </NavLink>
      )}
    </div>
  );
}
