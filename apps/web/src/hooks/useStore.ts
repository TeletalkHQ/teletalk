import {
  useAuthStore,
  useGlobalStore,
  useMessageStore,
  useSettingsStore,
  useUserStore,
} from "~/store";

export const useStore = () => {
  return {
    auth: useAuthStore(),
    global: useGlobalStore(),
    message: useMessageStore(),
    settings: useSettingsStore(),
    user: useUserStore(),
  };
};
