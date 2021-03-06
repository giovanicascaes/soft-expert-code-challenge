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

const LoadableHome = getLoadablePage(() =>
  import(/* webpackChunkName:'Home' */ "~/pages/Home")
);
const LoadablePokemon = getLoadablePage(() =>
  import(/* webpackChunkName:'Pokemon' */ "~/pages/Pokemon")
);
const LoadableNotFound = getLoadablePage(() =>
  import(/* webpackChunkName:'NotFound' */ "~/pages/NotFound")
);

export default function AppRouter() {
  return (
    <Router>
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
