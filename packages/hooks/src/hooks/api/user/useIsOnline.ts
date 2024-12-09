import { type BaseSchema } from "@repo/schema";

type Arg = { userId: BaseSchema.UserId | undefined };

export const useIsOnline = ({ userId }: Arg) => {
	return { isOnline: !!userId };
};
