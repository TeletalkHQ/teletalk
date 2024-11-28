"use client";

import { useCustomRouter } from "@repo/hooks";
import { useEffect } from "react";

const Page = () => {
	const router = useCustomRouter();

	useEffect(() => {
		router.push("/messenger");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};

export default Page;
