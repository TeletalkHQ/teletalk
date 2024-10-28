import { Box, Typography, TypographyProps } from "@repo/ui";

import { appConfigs } from "~/classes/AppConfigs";

interface Props extends TypographyProps {}

const Copyright: React.FC<Props> = (props) => {
	return (
		<Typography
			align="center"
			color="text.secondary"
			variant="body2"
			{...props}
		>
			{"Copyright © "}
			<Box.Link
				color="inherit"
				href={appConfigs.getConfigs().api.clientBaseUrl}
			>
				teletalk
			</Box.Link>

			{new Date().getFullYear()}
		</Typography>
	);
};

export default Copyright;
