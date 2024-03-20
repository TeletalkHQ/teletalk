import { useEffect } from "react";

import { websocket } from "~/classes/websocket/Websocket";
import { Box } from "~/components";
import RightSide from "~/containers/Messenger/RightSide";
import { useListener, useUnmount } from "~/hooks";
import { useSetUserData } from "~/hooks";
import { useUserStore } from "~/store";
import { resetAllStores } from "~/store/utils";

import LeftSide from "./LeftSide";
import Portal from "./Portal";

//REFACTOR
const Messenger = () => {
  const userStore = useUserStore();
  const { handler } = useSetUserData();
  useUnmount(resetAllStores);

  useListener({
    evName: "verify",
    cb: (response) => response.data.newUser === false && handler(),
  });
  useListener({
    cb: handler,
    evName: "createNewUser",
  });

  useEffect(() => {
    websocket.client.onAny((event, data) => {
      console.log("incoming event:", event, "data:", data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websocket.client]);

  useListener({
    evName: "getClientStatus",
    cb: (response) => {
      userStore.updateOnlineUser(response.data);
    },
  });

  useListener({
    evName: "getOnlineClients",
    cb: (response) => {
      userStore.updateOnlineUserList(
        response.data.onlineClients.map((i) => ({
          ...i,
          isOnline: true,
        }))
      );
    },
  });

  useListener({
    evName: "updateAvatar",
    cb: (response) => {
      if (response.data.userId === userStore.currentUserData.userId)
        userStore.updateCurrentUserAvatarSrc({
          avatarSrc: response.data.avatarSrc,
        });
      else userStore.updateUser(response.data);
    },
  });

  useListener({
    evName: "addContactWithUserId",
    cb: (response) => userStore.addContactWithUserId(response.data.newContact),
  });

  useListener({
    evName: "addContactWithCellphone",
    cb: (response) =>
      userStore.addContactWithCellphone(response.data.newContact),
  });

  useListener({
    evName: "updateContact",
    cb: (response) => userStore.updateUser(response.data.updatedContact),
  });

  useListener({
    evName: "removeContact",
    cb: (response) => userStore.removeContact(response.data.removedContact),
  });

  useListener({
    evName: "addBlock",
    cb: (response) => userStore.addBlock(response.data.blockedUser),
  });
  useListener({
    evName: "removeBlock",
    cb: (response) => userStore.removeBlock(response.data.removedBlock),
  });

  useListener({
    evName: "getPublicData",
    cb: async (response) => {
      userStore.updateUser(response.data.publicData);
    },
  });

  useListener({
    evName: "updatePublicData",
    cb: ({ data: { userPublicData } }) =>
      userStore.currentUserData.userId === userPublicData.userId
        ? userStore.updateCurrentUserPublicData(userPublicData)
        : userStore.updateUser({
            bio: userPublicData.bio,
            originalFirstName: userPublicData.firstName,
            originalLastName: userPublicData.lastName,
            userId: userPublicData.userId,
            username: userPublicData.username,
          }),
  });

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <Portal />
      <LeftSide />
      <RightSide />
    </Box.Grid>
  );
};

export default Messenger;
