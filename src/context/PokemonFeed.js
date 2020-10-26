import React, { useContext, useMemo, useReducer } from "react";
import { api } from "~/services";
import { Request } from "~/config";

const Actions = {
  REQUEST_INIT: "REQUEST_INIT",
  POKEMONS_FETCHED: "POKEMONS_FETCHED",
  REQUEST_ERROR: "REQUEST_ERROR",
};

const InitialState = {
  loading: false,
  error: false,
  success: false,
  count: 0,
  next: null,
  previous: null,
  results: [],
};

function reducer(state, action) {
  switch (action.type) {
    case Actions.REQUEST_INIT: {
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    }

    case Actions.POKEMONS_FETCHED: {
      return {
        ...state,
        loading: false,
        success: true,
        ...action.payload,
      };
    }
    case Actions.REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function usePokemonFeedProvider() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  async function getPokemons() {
    try {
      dispatch({ type: Actions.REQUEST_INIT });
      const pokemons = await api.get("/pokemon", {
        data: {
          limit: Request.DEFAULT_LIMIT,
        },
      });
      dispatch({ type: Actions.POKEMONS_FETCHED, payload: pokemons });
    } catch (e) {
      dispatch({
        type: Actions.REQUEST_ERROR,
        payload:
          "An error ocurred listing pokémons. Probably they are in the middle of a battle...",
      });
    }
  }

  const actions = useMemo(
    () => ({
      getPokemons,
    }),
    []
  );
  const value = useMemo(() => [state, actions], [state, actions]);
  return value;
}

const PokemonFeedContext = React.createContext(null);

function PokemonFeedProvider(props) {
  const value = usePokemonFeedProvider();
  return <PokemonFeedContext.Provider value={value} {...props} />;
}

function usePokemonFeed() {
  const context = useContext(PokemonFeedContext);

  if (context === null) {
    throw new Error(`usePokemonFeed must be used within a PokemonFeedProvider`);
  }

  return context;
}

export { PokemonFeedProvider, usePokemonFeed };
