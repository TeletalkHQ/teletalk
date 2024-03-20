import type { UserId } from "teletalk-type-store";

import { maker } from "~/classes/Maker";
import { useUserStore } from "~/store";

export const useFindUserById = (userId: UserId) => {
  const userStore = useUserStore();

  const finder = (u: UserId) => {
    return (
      userStore.users.find((i) => i.userId === (u || userId)) ||
      maker.emptyUser()
    );
  };

  return {
    data: finder(userId),
    finder,
  };
};
