import { Avatar } from "@repo/ui/box/Avatar";
import { Container } from "@repo/ui/box/container";
import { Flex } from "@repo/ui/box/flex";
import { LockOutlinedIcon } from "@repo/ui/icons/lockOutlined";
import { Typography } from "@repo/ui/typography/typography";

import { AuthFooter } from "../common/AuthFooter";
import { SignForm } from "./_parts/sign-form";

const SignIn = () => {
	return (
		<Container mw="xl">
			<Flex ai="center" col mt={8}>
				<Avatar
					style={
						{
							// m: 1,
							// backgroundColor: theme.palette.secondary.main,
						}
					}
				>
					<LockOutlinedIcon />
				</Avatar>

				<Typography variant="h5">Teletalk</Typography>

				<Container mw="xs">
					<SignForm />
				</Container>
			</Flex>

			<AuthFooter />
		</Container>
	);
};

export default SignIn;
