import { Box, Typography } from "@repo/ui";

interface Props {
	fullName: string;
}

export const Content: React.FC<Props> = ({ fullName }) => (
	<>
		<Box.Div style={{ textAlign: "center", fontSize: 18 }}>
			<Box.Span>Are you sure you want to</Box.Span>{" "}
			<Typography.Bold>block</Typography.Bold> <Box.Span>user</Box.Span>{" "}
			<Typography.Bold>{fullName}</Typography.Bold>
			<Box.Span>?</Box.Span>
		</Box.Div>
	</>
);
