import { Box, Typography } from "@repo/ui";

export const Content = () => (
	<>
		<Box.Div
			style={{
				fontSize: 18,
				textAlign: "center",
			}}
		>
			<Box.Span>Are you sure you want to</Box.Span>{" "}
			<Typography>delete</Typography>
			<Box.Span> your avatar?</Box.Span>
		</Box.Div>
	</>
);
