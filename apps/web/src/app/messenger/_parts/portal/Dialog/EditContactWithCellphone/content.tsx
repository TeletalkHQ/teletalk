import type { FullName } from "@repo/types";

import { Box, Input } from "~/components";
import { OnInputChange } from "~/types";

interface Props {
	fullName: FullName;
	onChange: OnInputChange;
}
export const Content: React.FC<Props> = ({ fullName, onChange }) => {
	return (
		<>
			<Box.Div>
				<Box.Flex col jc="space-between" mt={2}>
					<Input.Text.FullName
						firstName={fullName.firstName}
						lastName={fullName.lastName}
						onFirstNameInputChange={onChange}
						onLastNameInputChange={onChange}
					/>
				</Box.Flex>
			</Box.Div>
		</>
	);
};

export default Content;
