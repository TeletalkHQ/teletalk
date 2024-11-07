import { userUtils } from "@repo/classes";

import { Box, Typography } from "~/components";
import { useGetPublicData } from "~/hooks";
import { useMessageStore } from "~/store";

const ChatBarCenterContent = () => {
	const messageStore = useMessageStore();

	const { publicInfo } = useGetPublicData(messageStore.selectedChatInfo.userId);

	const fullName = userUtils.concatFirstNameWithLastName(publicInfo);

	return (
		<Box.Flex ai="center">
			<Typography.Bold
				style={{
					fontSize: 18,
				}}
			>
				{fullName}
			</Typography.Bold>
		</Box.Flex>
	);
};

export default ChatBarCenterContent;