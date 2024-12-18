import type { BaseSchema } from "@repo/schema";

export const concatenatePhone = (data: {
	countryCode: BaseSchema.CountryCode;
	phoneNumber: BaseSchema.PhoneNumber;
}) => {
	return `+${data.countryCode} ${data.phoneNumber}`;
};
