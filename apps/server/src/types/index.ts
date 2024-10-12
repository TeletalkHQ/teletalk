import { GetOutput, IOName } from "@repo/schema";

export type GetAPIOutput<T extends IOName> = Promise<{
	data: GetOutput<T>;
}>;
