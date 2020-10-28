import "react-hot-loader";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { PokemonDetailsProvider } from "~/context";
import { LoadableLoading } from "~/components";

const getLoadablePage = (importFn) =>
  Loadable({
    loader: importFn,
    loading: LoadableLoading,
    timeout: 10000,
  });

const LoadableHome = getLoadablePage(() => import("~/pages/Home"));
const LoadablePokemon = getLoadablePage(() => import("~/pages/Pokemon"));
const LoadableNotFound = getLoadablePage(() => import("~/pages/NotFound"));

export default function AppRouter() {
  return (
    <Router basename="/soft-expert-code-challenge">
      <Switch>
        <Route path="/" exact component={LoadableHome} />
        <Route
          path="/pokemon/:id"
          exact
          render={(routeProps) => (
            <PokemonDetailsProvider>
              <LoadablePokemon {...routeProps} />
            </PokemonDetailsProvider>
          )}
        />
        <Route path="*" component={LoadableNotFound} />
      </Switch>
    </Router>
  );
}
