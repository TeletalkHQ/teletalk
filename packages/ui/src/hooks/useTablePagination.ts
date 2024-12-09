import type { PaginationStore } from "../store";
import { usePaginationStore } from "../store";

export const useTablePagination = (name: PaginationStore.TableName) => {
	const paginationStore = usePaginationStore();

	const updatePagination = (
		props: Partial<PaginationStore.PaginationDefaultProps>
	) => paginationStore.updatePagination({ name, props });

	return {
		pagination: paginationStore.pagination[name],
		updatePagination,
	};
};
