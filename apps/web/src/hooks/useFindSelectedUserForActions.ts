import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";

export const useFindSelectedUserForActions = () => {
  const userStore = useUserStore();

  return (
    userStore.users.find(
      (item) => item.userId === userStore.selectedUserIdForActions
    ) || maker.emptyUser()
  );
};
