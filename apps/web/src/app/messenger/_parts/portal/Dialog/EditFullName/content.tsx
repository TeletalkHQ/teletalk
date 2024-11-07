import type { FullName } from "@repo/types";

import { Box, Input } from "~/components";
import { OnInputChange } from "~/types";

interface Props {
	fullName: FullName;
	onChange: OnInputChange;
}

export const Content: React.FC<Props> = ({ fullName, onChange }) => {
	return (
		<Box.Flex col>
			<Input.Text.FullName
				firstName={fullName.firstName}
				lastName={fullName.lastName}
				onFirstNameInputChange={onChange}
				onLastNameInputChange={onChange}
			/>
		</Box.Flex>
	);
};

export default Content;
