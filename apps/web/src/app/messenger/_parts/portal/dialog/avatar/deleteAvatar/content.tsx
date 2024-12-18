import { Div } from "@repo/ui/box/div";
import { Span } from "@repo/ui/box/span";
import { Typography } from "@repo/ui/typography/typography";

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
