import { Box, Typography } from "@repo/ui";

export const Content = () => (
	<>
		<Box.Div style={{ textAlign: "center", fontSize: 18 }}>
			<Box.Span>Are you sure you want to</Box.Span>{" "}
			<Typography>logout</Typography>
			<Box.Span>?</Box.Span>
		</Box.Div>
	</>
);
