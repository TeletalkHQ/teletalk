import { Control } from "@repo/hooks";
import { FormSchema } from "@repo/schema";
import { Flex } from "@repo/ui/box/flex";
import { FirstName } from "@repo/ui/input/firstName";
import { Typography } from "@repo/ui/typography/typography";
import { useWatch } from "react-hook-form";

interface Props {
	control: Control<FormSchema["updateUsername"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	const { username } = useWatch({
		control,
	});

	return (
		<Flex col style={{ maxWidth: 400 }}>
			<FirstName control={control} />

			<Typography variant="caption">
				You can choose a username on Teletalk. If you do, other people will be
				able to find you by this username and contact you without knowing your
				phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
				{/* TODO: Use `username` schema length */}
				{username?.length} characters.
			</Typography>
		</Flex>
	);
};
