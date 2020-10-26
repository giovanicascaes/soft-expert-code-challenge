import React, { useEffect } from "react";
import { usePokemonFeed } from "~/context/PokemonFeed";
import { Loading } from "~/components";

export default function Home() {
  const [state, actions] = usePokemonFeed();

  useEffect(() => {
    actions.getPokemons();
  }, [actions]);

  if (state.loading) {
    return <Loading />;
  }

  return <div>
    
  </div>;
}
