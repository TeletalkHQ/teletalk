import { Avatar } from "@repo/ui/box/Avatar";
import { VerifiedUserIcon } from "@repo/ui/icons/verifiedUser";
import { Typography } from "@repo/ui/typography/typography";

import { EnteredPhoneNumber } from "./_parts/enteredPhoneNumber";
import { VerifyForm } from "./_parts/verifyForm";

const Verify = () => {
	return (
		<>
			<Avatar>
				<VerifiedUserIcon />
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
