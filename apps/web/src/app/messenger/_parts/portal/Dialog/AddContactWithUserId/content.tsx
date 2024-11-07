import type { FullName } from "@repo/types";

import { Box, Input } from "~/components";
import { OnInputChange } from "~/types";

interface Props {
	contact: FullName;
	onChange: OnInputChange;
}

export const Content: React.FC<Props> = ({ contact, onChange }) => {
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
