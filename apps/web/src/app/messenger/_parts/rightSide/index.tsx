import { Box } from "@repo/ui";

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
		<Box.Grid
			container
			item
			lg={9}
			md={8}
			sx={{
				height: "100%",
			}}
		>
			{selectedChatId && (
				<Box.Flex
					ai="center"
					col
					jc="space-between"
					sx={{
						height: "100%",
						width: "100%",
					}}
				>
					<Box.Div
						style={{
							width: "100%",
						}}
					>
						<ChatBar />
					</Box.Div>

					<MessageList />

					<Box.Div
						style={{
							width: "100%",
						}}
					>
						<MessageInput />
					</Box.Div>
				</Box.Flex>
			)}
		</Box.Grid>
	);
};
