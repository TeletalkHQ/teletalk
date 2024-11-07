import { BaseSchema } from "@repo/schema";

type Arg = { userId: BaseSchema.UserId };

export const useIsOnline = ({ userId }: Arg) => {
	return !!userId;
};
