export type EntityFilterer<T> = Omit<
	T,
	"logInsert" | "logUpdate" | "logRemove" | "logger"
>;
