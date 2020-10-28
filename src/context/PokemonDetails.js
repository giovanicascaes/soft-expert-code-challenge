import React, { useContext, useMemo, useReducer, useCallback } from "react";
import { api } from "~/services";

const Actions = {
  REQUEST_INIT: "REQUEST_INIT",
  POKEMON_DETAILS_FETCHED: "POKEMON_DETAILS_FETCHED",
  REQUEST_ERROR: "REQUEST_ERROR",
};

const InitialState = {
  loading: false,
  error: false,
  success: false,
  details: null,
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

    case Actions.POKEMON_DETAILS_FETCHED: {
      return {
        ...state,
        loading: false,
        success: true,
        details: action.payload,
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

function usePokemonDetailsProvider() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const getPokemonDetails = useCallback(async (id) => {
    try {
      dispatch({ type: Actions.REQUEST_INIT });
      const result = await api.get(`/pokemon/${id}`);
      dispatch({
        type: Actions.POKEMON_DETAILS_FETCHED,
        payload: result,
      });
    } catch (e) {
      dispatch({
        type: Actions.REQUEST_ERROR,
        payload: {
          message:
            "An error ocurred getting pokemon details. Probably it has fleeded...",
          status: e.status,
        },
      });
    }
  }, []);

  const actions = useMemo(
    () => ({
      getPokemonDetails,
    }),
    [getPokemonDetails]
  );
  const value = useMemo(() => [state, actions], [state, actions]);
  return value;
}

const PokemonDetailsContext = React.createContext(null);

function PokemonDetailsProvider(props) {
  const value = usePokemonDetailsProvider();
  return <PokemonDetailsContext.Provider value={value} {...props} />;
}

function usePokemonDetails() {
  const context = useContext(PokemonDetailsContext);

  if (context === null) {
    throw new Error(
      `usePokemonDetails must be used within a PokemonDetailsProvider`
    );
  }

  return context;
}

export { PokemonDetailsProvider, usePokemonDetails };
