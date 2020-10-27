import "react-hot-loader";
import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { PokemonFeedProvider, PokemonDetailsProvider } from "~/context";
import { Home, Pokemon } from "~/pages";
import { NavBar } from "~/components";
import "~/assets/css/index.css"

library.add(fas, faSync);

function App() {
  return (
    <div className="font-body h-full flex flex-col">
      <PokemonFeedProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route
              path="/pokemon/:id"
              render={(routeProps) => (
                <PokemonDetailsProvider>
                  <Pokemon {...routeProps} />
                </PokemonDetailsProvider>
              )}
            />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </PokemonFeedProvider>
    </div>
  );
}

export default hot(App);
