"use client";

import { useConfigs } from "@repo/hooks";
import { Link, Typography, TypographyProps } from "@repo/ui";

interface Props extends TypographyProps {}

export const Copyright: React.FC<Props> = (props) => {
	const { getAppBaseUrl } = useConfigs();

	return (
		<Typography
			align="center"
			color="text.secondary"
			variant="body2"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href={getAppBaseUrl()}>
				teletalk
			</Link>

			{new Date().getFullYear()}
		</Typography>
	);
};
