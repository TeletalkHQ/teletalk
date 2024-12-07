import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Grid } from "@repo/ui/box/grid";

import { useChatStore } from "~/store";

import { ChatBar } from "./ChatBar";
import { MessageInput } from "./messageInput";
import { MessageList } from "./messageList";

export const RightSide = () => {
	const selectedChatId = useChatStore((state) => state.selectedChatId);

	// useEffect(() => {
	// TODO: Check if `isAuthenticated`
	// if (!storage.get("session")) router.push("signIn");
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	// useEffect(() => {
	// TODO: Handle this in server-side
	// if (userStore.currentUserData.userId)
	// 	joinHandler.send(undefined, () => {
	// 		getOnlineClientsHandler.send(undefined);
	// 	});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [userStore.currentUserData.userId]);

	return (
		<Grid
			container
			item
			lg={9}
			md={8}
			sx={{
				height: "100%",
			}}
		>
			{selectedChatId && (
				<Flex
					ai="center"
					col
					jc="space-between"
					sx={{
						height: "100%",
						width: "100%",
					}}
				>
					<Div
						style={{
							width: "100%",
						}}
					>
						<ChatBar />
					</Div>

					<MessageList />

					<Div
						style={{
							width: "100%",
						}}
					>
						<MessageInput />
					</Div>
				</Flex>
			)}
		</Grid>
	);
};
