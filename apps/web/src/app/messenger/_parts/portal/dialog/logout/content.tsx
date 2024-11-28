import { Div, Span, Typography } from "@repo/ui";

export const Content = () => (
	<Div style={{ textAlign: "center", fontSize: 18 }}>
		<Span>Are you sure you want to</Span> <Typography>logout</Typography>
		<Span>?</Span>
	</Div>
);
