import { Control } from "@repo/hooks";
import { Box, FirstName, Typography } from "@repo/ui";
import { useWatch } from "react-hook-form";

interface Props {
	control: Control<"updateUsername">;
}

export const Content: React.FC<Props> = ({ control }) => {
	const { username } = useWatch({
		control,
	});

	return (
		<Box.Flex col style={{ maxWidth: 400 }}>
			<FirstName control={control} />

			<Typography variant="caption">
				You can choose a username on Teletalk. If you do, other people will be
				able to find you by this username and contact you without knowing your
				phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
				{/* TODO: Use `username` schema length */}
				{username?.length} characters.
			</Typography>
		</Box.Flex>
	);
};
