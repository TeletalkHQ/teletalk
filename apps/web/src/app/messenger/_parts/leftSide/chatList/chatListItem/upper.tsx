import { Div } from "@repo/ui/box/div";
import { Flex } from "@repo/ui/box/flex";
import { Typography } from "@repo/ui/typography/typography";

interface Props {
	fullName: string;
}

export const Upper: React.FC<Props> = ({ fullName }) => (
	<Flex
		ai="center"
		jc="space-between"
		style={{
			width: "100%",
		}}
	>
		<Typography fontWeight="bold">{fullName}</Typography>
		<Div>
			<Typography
				style={{
					fontSize: 12,
				}}
				variant="caption"
			>
				12:38
			</Typography>
		</Div>
	</Flex>
);
