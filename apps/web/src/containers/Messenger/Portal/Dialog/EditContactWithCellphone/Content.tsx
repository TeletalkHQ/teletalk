import type { FullName } from "@repo/type-store";

import { Box, Input } from "~/components";
import { CommonOnChange } from "~/types";

interface Props {
	fullName: FullName;
	onChange: CommonOnChange;
}
const Content: React.FC<Props> = ({ fullName, onChange }) => {
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
