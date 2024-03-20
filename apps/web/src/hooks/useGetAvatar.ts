import { useEffect } from "react";
import { UserId } from "teletalk-type-store";

import defaultAvatar from "~/assets/images/default-avatar.png";
import { useUserStore } from "~/store";

import { useEmitter } from "./useEmitter";
import { useFindUserById } from "./useFindUserById";

export const useGetAvatar = (userId: UserId) => {
  const userStore = useUserStore();
  const { handler: getAvatarHandler, loading } = useEmitter("getAvatar");
  const {
    data: { avatarSrc },
  } = useFindUserById(userId);

  useEffect(() => {
    if (!userId || !userStore.isUserDataSettled) return;

    handler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, userStore.isUserDataSettled]);

  const handler = () => {
    const user = userStore.users.find((i) => i.userId === userId);
    if (user?.avatarSrc) return;

    getAvatarHandler.emitFull({ userId }, (response) => {
      userStore.updateUser({
        userId: response.data.userId,
        avatarSrc: response.data.avatarSrc || defaultAvatar.src,
      });
    });
  };

  return {
    avatarSrc: avatarSrc || defaultAvatar.src,
    handler,
    loading,
  };
};
