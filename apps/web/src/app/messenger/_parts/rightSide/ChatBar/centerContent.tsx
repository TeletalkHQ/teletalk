import { useConcatenatedFullName } from "@repo/hooks/useConcatenatedFullName";
import { Flex } from "@repo/ui/box/flex";
import { Typography } from "@repo/ui/typography/typography";

import { useUserStore } from "~/store";

export const ChatBarCenterContent = () => {
	const selectedUUID = useUserStore((state) => state.selectedUUID);

	const fullName = useConcatenatedFullName({ userId: selectedUUID.to.chat });

	return (
		<Flex ai="center">
			<Typography
				fontWeight="bold"
				style={{
					fontSize: 18,
				}}
			>
				{fullName}
			</Typography>
		</Flex>
	);
};
