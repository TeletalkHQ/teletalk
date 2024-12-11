import { Grid } from "@repo/ui/box/grid";

import { LeftSide } from "./leftSide";
import { Portal } from "./portal";

//REFACTOR
export const MessengerContainer = () => {
	// useListener({
	// 	evName: "verify",
	// 	cb: (response) => response.data.newUser === false && handler(),
	// });
	// useListener({
	// 	cb: handler,
	// 	evName: "createUser",
	// });

	// useEffect(() => {
	// 	websocket.client.onAny((event, data) => {
	// 		console.log("incoming event:", event, "data:", data);
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [websocket.client]);

	// useListener({
	// 	evName: "getClientStatus",
	// 	cb: (response) => {
	// 		userStore.updateOnlineUser(response.data);
	// 	},
	// });

	// useListener({
	// 	evName: "getOnlineClients",
	// 	cb: (response) => {
	// 		userStore.updateOnlineUserList(
	// 			response.data.onlineClients.map((i) => ({
	// 				...i,
	// 				isOnline: true,
	// 			}))
	// 		);
	// 	},
	// });

	// useListener({
	// 	evName: "updateAvatar",
	// 	cb: (response) => {
	// 		if (response.data.userId === userStore.currentUserData.userId)
	// 			userStore.updateCurrentUserAvatarSrc({
	// 				avatarSrc: response.data.avatarSrc,
	// 			});
	// 		else userStore.updateUser(response.data);
	// 	},
	// });

	// useListener({
	// 	evName: "addContact",
	// 	cb: (response) => userStore.addContact(response.data.newContact),
	// });

	// useListener({
	// 	evName: "updateContact",
	// 	cb: (response) => userStore.updateUser(response.data.updatedContact),
	// });

	// useListener({
	// 	evName: "removeContact",
	// 	cb: (response) => userStore.removeContact(response.data.removedContact),
	// });

	// useListener({
	// 	evName: "addBlock",
	// 	cb: (response) => userStore.addBlock(response.data.blockedUser),
	// });
	// useListener({
	// 	evName: "removeBlock",
	// 	cb: (response) => userStore.removeBlock(response.data.removedBlock),
	// });

	// useListener({
	// 	evName: "getUserPublicInfo",
	// 	cb: async (response) => {
	// 		userStore.updateUser(response.data.publicInfo);
	// 	},
	// });

	// useListener({
	// 	evName: "updateUserPublicInfo",
	// 	cb: ({ data: { userPublicData } }) =>
	// 		userStore.currentUserData.userId === userPublicData.userId
	// 			? userStore.updateCurrentUserPublicData(userPublicData)
	// 			: userStore.updateUser({
	// 					bio: userPublicData.bio,
	// 					originalFirstName: userPublicData.firstName,
	// 					originalLastName: userPublicData.lastName,
	// 					userId: userPublicData.userId,
	// 					username: userPublicData.username,
	// 				}),
	// });

	return (
		<Grid
			container
			style={{
				height: "100vh",
			}}
		>
			<Portal />
			<LeftSide />
			{/* <RightSide /> */}
		</Grid>
	);
};
