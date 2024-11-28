import { Div, Span, Typography } from "@repo/ui";

export const Content = () => (
	<Div
		style={{
			fontSize: 18,
			textAlign: "center",
		}}
	>
		<Span>Are you sure you want to</Span> <Typography>delete</Typography>
		<Span> your avatar?</Span>
	</Div>
);
