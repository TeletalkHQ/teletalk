import { AccountCircleOutlinedIcon } from "@repo/ui/icons/accountCircleOutlined";
import { Typography } from "@repo/ui/typography/typography";

import { CreateUserForm } from "./_parts/createUserForm";

const CreateUser = () => {
	return (
		<>
			<AccountCircleOutlinedIcon color="primary" fontSize="large" />

			<Typography variant="caption">
				Please enter this information to complete your account creation.
			</Typography>

			<CreateUserForm />
		</>
	);
};

export default CreateUser;
