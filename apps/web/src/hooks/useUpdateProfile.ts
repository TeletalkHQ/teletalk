import { useSettingsStore } from "~/store";
import { VoidNoArgsFn } from "~/types";

import { useEmitter } from "./useEmitter";

export const useUpdateProfile = () => {
  const settingsStore = useSettingsStore();
  const { handler: updatePublicDataHandler, loading } =
    useEmitter("updatePublicData");

  const handler = (cb?: VoidNoArgsFn) => {
    const { countryCode, countryName, phoneNumber, ...restProfile } =
      settingsStore.profile;

    updatePublicDataHandler.emitFull(restProfile, cb);
  };

  return {
    loading,
    handler,
  };
};
