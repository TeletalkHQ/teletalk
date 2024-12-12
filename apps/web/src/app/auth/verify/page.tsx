import { Avatar } from "@repo/ui/box/Avatar";
import { DynamicIcon } from "@repo/ui/icons/dynamicIcon";
import { Typography } from "@repo/ui/typography/typography";
import { MdOutlineVerifiedUser } from "react-icons/md";

import { EnteredPhoneNumber } from "./_parts/enteredPhoneNumber";
import { VerifyForm } from "./_parts/verifyForm";

const Verify = () => {
	return (
		<>
			<Avatar>
				<DynamicIcon icon={MdOutlineVerifiedUser} />
			</Avatar>

			<EnteredPhoneNumber />

			<Typography variant="caption">
				We have sent the code to your phone number
			</Typography>

			<VerifyForm />
		</>
	);
};

export default Verify;
