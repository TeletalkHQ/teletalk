import { PaginationStore, usePaginationStore } from "@repo/store";

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
