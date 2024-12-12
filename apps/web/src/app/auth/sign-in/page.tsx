import { Avatar } from "@repo/ui/box/Avatar";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { Typography } from "@repo/ui/typography/typography";
import { CiLock } from "react-icons/ci";

import { SignForm } from "./_parts/signForm";

const SignIn = () => {
	return (
		<>
			<Avatar>
				<DynamicIcon icon={CiLock} />
			</Avatar>

			<Typography variant="h5">Teletalk</Typography>

			<SignForm />
		</>
	);
};

export default SignIn;
