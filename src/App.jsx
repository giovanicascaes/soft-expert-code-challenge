import "react-hot-loader";
import { hot } from "react-hot-loader/root";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { PokemonFeedProvider } from "~/context";
import Router from "./Router";
import "~/assets/css/index.css";

library.add(fas, faSync);

function App() {
  return (
    <div className="font-body h-full flex flex-col">
      <PokemonFeedProvider>
        <Router />
      </PokemonFeedProvider>
    </div>
  );
}

export default hot(App);
