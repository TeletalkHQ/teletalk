import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { Typography } from "@repo/ui/typography/typography";
import { RiAccountCircle2Line } from "react-icons/ri";

import { CreateUserForm } from "./_parts/createUserForm";

const CreateUser = () => {
	return (
		<>
			<DynamicIcon icon={RiAccountCircle2Line} />

			<Typography variant="caption">
				Please enter this information to complete your account creation.
			</Typography>

			<CreateUserForm />
		</>
	);
};

export default CreateUser;
