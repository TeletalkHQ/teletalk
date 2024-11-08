import { Box, Typography } from "@repo/ui";

interface Props {
	fullName: string;
}

export const Content: React.FC<Props> = ({ fullName }) => (
	<>
		<Box.Div style={{ textAlign: "center", fontSize: 18 }}>
			<Box.Span>Are you sure you want to</Box.Span>{" "}
			<Typography>remove</Typography> <Box.Span>user</Box.Span>{" "}
			<Typography>{fullName} </Typography>
			<Box.Span>from your contacts?</Box.Span>
		</Box.Div>
	</>
);
