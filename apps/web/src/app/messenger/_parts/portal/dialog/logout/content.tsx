import { Div } from "@repo/ui/box/div";
import { Span } from "@repo/ui/box/span";
import { Typography } from "@repo/ui/typography/typography";

export const Content = () => (
	<Div style={{ textAlign: "center", fontSize: 18 }}>
		<Span>Are you sure you want to</Span> <Typography>logout</Typography>
		<Span>?</Span>
	</Div>
);
