"use client";

import Timeout from "await-timeout";
import { useRouter } from "next/navigation";

export const useNavigate = () => {
	const router = useRouter();

	const toNewSideBar = async <T extends string>(
		sidebarName: T,
		newParams?: object,
		delay?: number
	) => {
		// TODO: Use debounce
		if (delay) await Timeout.set(delay);

		// addNewParams(
		// 	{
		// 		...newParams,
		// 		sidebarName,
		// 	},
		// 	toNewSideBar.name
		// );
	};

	const closeSideBar = () => {
		// addNewParams(
		// 	{
		// 		sidebarName: undefined,
		// 	},
		// 	closeSideBar.name
		// );
	};
	//TODO: add type
	const replace = (url: string) => {
		router.replace(url);
	};

	return {
		closeSideBar,
		replace,
		toNewSideBar,
	};
};
