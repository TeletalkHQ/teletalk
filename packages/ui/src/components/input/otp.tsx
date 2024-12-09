"use client";

import "mui-one-time-password-input";
import type { MuiOtpInputProps } from "mui-one-time-password-input";
import { MuiOtpInput } from "mui-one-time-password-input";

export const OTP = (props: MuiOtpInputProps) => {
	return <MuiOtpInput.call {...props} />;
};
