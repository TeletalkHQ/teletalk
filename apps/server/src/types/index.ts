import { GetInput, GetOutput, IOName } from "@repo/schema";

export type GetAPIOutput<T extends IOName> = Promise<{ data: GetOutput<T> }>;

export type GetAPIInput<T extends IOName> = GetInput<T>;

export type EntityFilterer<T> = Omit<
	T,
	"logInsert" | "logUpdate" | "logRemove" | "logger"
>;
