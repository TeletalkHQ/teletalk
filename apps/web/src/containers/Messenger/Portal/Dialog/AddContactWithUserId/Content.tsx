import type { FullName } from "@repo/type-store";

import { Box, Input } from "~/components";
import { CommonOnChange } from "~/types";

interface Props {
	contact: FullName;
	onChange: CommonOnChange;
}

const Content: React.FC<Props> = ({ contact, onChange }) => {
	return (
		<>
			<Box.Div>
				<Box.Flex col jc="space-between" mt={2}>
					<Input.Text.FullName
						firstName={contact.firstName}
						lastName={contact.lastName}
						onFirstNameInputChange={onChange}
						onLastNameInputChange={onChange}
					/>
				</Box.Flex>
			</Box.Div>
		</>
	);
};

export default Content;
