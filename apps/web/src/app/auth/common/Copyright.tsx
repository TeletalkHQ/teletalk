import { useConfigs } from "@repo/hooks";
import { Box, Typography, TypographyProps } from "@repo/ui";

interface Props extends TypographyProps {}

const Copyright: React.FC<Props> = (props) => {
	const { getAppBaseUrl } = useConfigs();

	return (
		<Typography
			align="center"
			color="text.secondary"
			variant="body2"
			{...props}
		>
			{"Copyright © "}
			<Box.Link color="inherit" href={getAppBaseUrl()}>
				teletalk
			</Box.Link>

			{new Date().getFullYear()}
		</Typography>
	);
};

export default Copyright;
