"use client";

import { LoadingStore } from "@repo/store";
import Timeout from "await-timeout";
import { useRouter } from "next/navigation";

import { Params } from "../../types";

type NewParams = Omit<Partial<Params>, "sidebarName">;

export const useNavigate = () => {
	const router = useRouter();

	const toNewSideBar = async <T extends LoadingStore.SidebarName>(
		sidebarName: T,
		newParams?: NewParams,
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
