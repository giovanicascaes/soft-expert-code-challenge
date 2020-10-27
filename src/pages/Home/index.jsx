import React, { useEffect, useState, useCallback } from "react";
import { usePokemonFeed } from "~/context/PokemonFeed";
import {
  Loading,
  LoadingMore,
  IntersetctionOberverWrapper,
} from "~/components";
import { Item } from "./components";

export default function Home() {
  const [lastItemEl, setLastItemEl] = useState(null);
  const lastItemRef = useCallback(setLastItemEl, [setLastItemEl]);

  const [state, actions] = usePokemonFeed();

  useEffect(() => {
    actions.getPokemons();
  }, []);

  const loadingMoreObserveCallback = useCallback(
    (direction) => {
      if (direction === "up" && !state.loading) {
        actions.getPokemons();
      }
    },
    [state.loading, actions]
  );

  if (!state.pokemons.length && state.loading) {
    return <Loading />;
  }

  return (
    <IntersetctionOberverWrapper
      threshold={0.5}
      observableEl={lastItemEl}
      observeCallback={loadingMoreObserveCallback}
    >
      <div className="flex flex-col items-center py-4 overflow-y-auto">
        {state.pokemons.map(({ name }, i) => {
          const isLast = i === state.pokemons.length - 1;
          return (
            <Item
              key={name}
              {...{ name }}
              ref={isLast ? lastItemRef : undefined}
            />
          );
        })}
        {state.more && state.loading && <LoadingMore />}
      </div>
    </IntersetctionOberverWrapper>
  );
}
