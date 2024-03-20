import { useState } from "react";

import { UpdateLoadingFn } from "~/types";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const finishLoading = () => setLoading(false);

  const startLoading = () => setLoading(true);

  const toggleLoading = () => setLoading(!loading);

  const updateLoading: UpdateLoadingFn = (l: boolean) => setLoading(l);

  return {
    finishLoading,
    loading,
    startLoading,
    toggleLoading,
    updateLoading,
  };
};
