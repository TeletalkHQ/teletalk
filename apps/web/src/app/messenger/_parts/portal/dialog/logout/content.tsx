import { Div } from "@repo/ui/box/div";
import { Typography } from "@repo/ui/typography/typography";

export const Content = () => (
	<Div>
		<Typography textAlign="center">
			Are you sure you want to{" "}
			<Typography component="span" fontWeight="bold">
				log out
			</Typography>
			?
		</Typography>
	</Div>
);
