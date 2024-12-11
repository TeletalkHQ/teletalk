"use client";

import { Typography } from "@repo/ui/typography/typography";

import { useAuthUrlQueries } from "~/hooks/utils/useAuthUrlQueries";

export const EnteredPhoneNumber = () => {
	const { countryCode, phoneNumber } = useAuthUrlQueries();

	return (
		<Typography variant="h5">
			+{countryCode} {phoneNumber}
		</Typography>
	);
};
