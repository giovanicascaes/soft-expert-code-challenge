import "react-hot-loader";
import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PokemonFeedProvider } from "~/context";
import { Home, Pokemon } from "~/pages";
import { NavBar } from "~/components";
import "./App.sass";

function App() {
  return (
    <div className="App">
      <PokemonFeedProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/pokemon/:id">
              <Pokemon />
            </Route>
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
