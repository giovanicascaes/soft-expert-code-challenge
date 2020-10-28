import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePokemonDetails } from "~/context";
import { Loading, Badge } from "~/components";
import { capitalize, classNames } from "~/utils";
import Layout from "../Layout";
import NotFound from "../NotFound";
import styles from "./styles.module.css";

export default function Pokemon({ match }) {
  const [state, actions] = usePokemonDetails();
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    actions.getPokemonDetails(match.params.id);
  }, []);

  if (state.error && state.error.status === 404) {
    return <NotFound />;
  }

  if (!state.details || state.loading) {
    return <Loading />;
  }

  const {
    name,
    sprites,
    height,
    weight,
    stats,
    abilities,
    types,
  } = state.details;

  return (
    <Layout>
      <div className="flex flex-col items-center py-8 overflow-y-auto">
        <div className="w-3/5 flex flex-col items-center pt-20">
          <span className="text-4xl font-light">{capitalize(name)}</span>
          <div
            className={classNames(
              "mt-8 w-64 h-64 relative",
              styles.flipWrapper,
              flip ? styles.flip : null
            )}
          >
            <div className={styles.flipper}>
              <img
                className={classNames(
                  "w-64 h-64 absolute top-0 left-0 z-10",
                  styles.front
                )}
                src={sprites.front_default}
                alt={`${capitalize(name)}'s front image`}
              />
              <img
                className={classNames(
                  "w-64 h-64 absolute top-0 left-0",
                  styles.back
                )}
                src={sprites.back_default}
                alt={`${capitalize(name)}'s back image`}
              />
            </div>
          </div>
          <button
            className="w-8 h-8 text-gray-700 hover:text-gray-800 mt-4"
            onClick={() => setFlip((f) => !f)}
          >
            <FontAwesomeIcon icon="sync" />
          </button>
          <div className="w-full mt-20">
            <div className="grid grid-cols-12 gap-6">
              <div className="flex justify-between col-span-12 xl:col-span-6">
                <span>Height</span>
                <div className="text-gray-500">
                  <span className="font-thin">{height}</span>
                  <span className="text-sm">cm</span>
                </div>
              </div>
              <div className="flex justify-between col-span-12 xl:col-span-6">
                <span>Weight</span>
                <div className="text-gray-500">
                  <span className="font-thin">{weight}</span>
                  <span className="text-sm">kg</span>
                </div>
              </div>
              <div className="col-span-12">
                <span>Stats</span>
                <div className="grid grid-cols-12 gap-3 mt-3">
                  {stats.map((s) => (
                    <div
                      className="col-span-12 xl:col-span-6 ml-6"
                      key={s.stat.name}
                    >
                      <div className="flex justify-between">
                        <span className="font-thin">{s.stat.name}</span>
                        <span className="text-gray-500">
                          {s.base_stat}{" "}
                          <span className="text-sm">
                            <span className=" font-thin">(ef. </span>
                            <span>{s.effort}</span>
                            <span className="text-sm font-thin">)</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12">
                <div>
                  <span>Abilities</span>
                  <div className="space-x-2 mt-3 ml-6">
                    {abilities.map(({ ability }) => (
                      <Badge key={ability.name}>{ability.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                <div>
                  <span>Types</span>
                  <div className="space-x-2 mt-3 ml-6">
                    {types.map(({ type }) => (
                      <Badge key={type.name}>{type.name}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
