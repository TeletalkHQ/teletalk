import { MuiOtpInputProps } from "mui-one-time-password-input";
import dynamic from "next/dynamic";

const MuiOtpInput = dynamic(
	async () => {
		const result = await import("mui-one-time-password-input");
		return result.MuiOtpInput;
	},
	{
		ssr: false,
	}
);

interface Props extends MuiOtpInputProps {}

export const OTP: React.FC<Props> = (props) => {
	return <MuiOtpInput {...props} />;
};
