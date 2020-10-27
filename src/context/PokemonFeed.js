import React, { useContext, useMemo, useReducer, useCallback } from "react";
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
  pokemons: [],
  more: false,
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
        pokemons: [...state.pokemons, ...action.payload.results],
        more: !!action.payload.next,
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

  const getPokemons = useCallback(async () => {
    try {
      dispatch({ type: Actions.REQUEST_INIT });
      const result = await api.get("/pokemon", {
        data: {
          limit: Request.DEFAULT_LIMIT,
          offset: state.pokemons.length,
        },
      });
      dispatch({
        type: Actions.POKEMONS_FETCHED,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: Actions.REQUEST_ERROR,
        payload:
          "An error ocurred listing pokémons. Probably they are in the middle of a battle...",
      });
    }
  }, [state.pokemons.length]);

  const actions = useMemo(
    () => ({
      getPokemons,
    }),
    [getPokemons]
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
