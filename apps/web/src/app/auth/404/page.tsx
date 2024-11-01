import { useCustomRouter } from "@repo/hooks";
import { useEffect } from "react";

const Page404Container = () => {
	const router = useCustomRouter();

	useEffect(() => {
		router.push("messenger");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default Page404Container;