"use client";

import { type Control } from "@repo/hooks/useForm";
import {
	type FormSchema,
	getStringSchemaMaxLength,
	usernameSchema,
} from "@repo/schema";
import { Div } from "@repo/ui/box/div";
import { Username } from "@repo/ui/input/username";
import { Typography } from "@repo/ui/typography/typography";

interface Props {
	control: Control<FormSchema["updateUsername"]>;
}

export const Content: React.FC<Props> = ({ control }) => {
	return (
		<Div className="flex flex-col gap-2">
			<Username control={control} />

			<Typography variant="caption">
				You can choose a username on Teletalk. If you do, other people will be
				able to find you by this username and contact you without knowing your
				phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
				{/* TODO: Use `username` schema length */}
				{getStringSchemaMaxLength(usernameSchema)} characters.
			</Typography>
		</Div>
	);
};
