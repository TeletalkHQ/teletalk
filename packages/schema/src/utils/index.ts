import { ZodString } from "zod";

export const getZodStringMaxLength = <T extends ZodString>(schema: T) => {
	return schema._def.checks.find((item) => item.kind === "max")!.value;
};
