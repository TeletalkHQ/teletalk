import { CSSProperties, FC } from "react";

import { Flex } from "../../base/box";
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
		<Flex fullWidth gap="10px">
			<Flex alignItems="center" gap="10px" style={labelStyle}>
				{Icon && <Icon />}
				<Typography fontSize="10px" variant="xXs">
					{label}
				</Typography>
			</Flex>

			{inputComponent}
		</Flex>
	);
};
