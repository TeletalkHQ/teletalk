import { CSSProperties, FC } from "react";
import React from "react";

import { Box } from "../../base/box";
import { Typography } from "../../base/typography";
import { GeneratedIcon } from "../../icons";

interface Props {
	inputComponent: React.ReactNode;
	label: string;
	labelStyle: CSSProperties;
	Icon?: GeneratedIcon;
}
// TODO: What is this? Refactor? Relocate?
export const InputWrapper: FC<Props> = ({
	inputComponent,
	label,
	labelStyle,
	Icon,
}) => {
	return (
		<Box.Flex fullWidth gap="10px">
			<Box.Flex alignItems="center" gap="10px" style={labelStyle}>
				{Icon && <Icon />}
				<Typography fontSize="10px" variant="xXs">
					{label}
				</Typography>
			</Box.Flex>

			{inputComponent}
		</Box.Flex>
	);
};
