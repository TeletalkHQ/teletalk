import { DynamicIcon, IconName } from "@repo/assets";
import { CSSProperties, FC } from "react";
import React from "react";

import { Box } from "../../base/box";
import { Typography } from "../../base/typography";

interface Props {
	inputComponent: React.ReactNode;
	label: string;
	iconLabel?: IconName;
	labelStyle: CSSProperties;
}
// TODO: What is this? Refactor? Relocate?
export const InputWrapper: FC<Props> = ({
	inputComponent,
	label,
	labelStyle,
	iconLabel,
}) => {
	return (
		<Box.Flex fullWidth gap="10px">
			<Box.Flex alignItems="center" gap="10px" style={labelStyle}>
				{iconLabel && <DynamicIcon name={iconLabel} />}
				<Typography fontSize="10px" variant="xXs">
					{label}
				</Typography>
			</Box.Flex>

			{inputComponent}
		</Box.Flex>
	);
};
