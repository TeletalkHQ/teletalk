import type { Countries } from "teletalk-type-store";
import { randomMaker } from "utility-store";

const addUniqueIdToEachCountry = (countries: Countries) => {
  return {
    countries: countries.map((country) => ({
      ...country,
      id: randomMaker.id(),
    })),
  };
};

export const transformers = {
  addUniqueIdToEachCountry,
};
