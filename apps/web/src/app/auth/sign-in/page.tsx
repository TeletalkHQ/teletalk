import { Avatar } from "@repo/ui/box/Avatar";
import { LockOutlinedIcon } from "@repo/ui/icons/lockOutlined";
import { Typography } from "@repo/ui/typography/typography";

import { SignForm } from "./_parts/signForm";

const SignIn = () => {
	return (
		<>
			<Avatar>
				<LockOutlinedIcon />
			</Avatar>

			<Typography variant="h5">Teletalk</Typography>

			<SignForm />
		</>
	);
};

export default SignIn;
