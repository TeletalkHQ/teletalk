import { GetInput, GetOutput, IOName } from "@repo/schema";

export type GetAPIOutput<T extends IOName> = Promise<{
	data: GetOutput<T>;
	// TODO: Use `errorStoreService`
	errors?: Array<Error>;
}>;

export type GetAPIInput<T extends IOName> = {
	data: GetInput<T>;
};

export type EntityFilterer<T> = Omit<
	T,
	"logInsert" | "logUpdate" | "logRemove" | "logger"
>;
