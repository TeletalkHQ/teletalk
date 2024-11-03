"use client";

import { useConfigs } from "@repo/hooks";
import { socketEvents } from "@repo/schema";
import { useEmitter } from "@repo/socket";
import { useEffect } from "react";

const Messenger = () => {
	const { getApiWSBaseUrl } = useConfigs();

	const { schema } = socketEvents.find(
		(item) => item.schema.ioName === "getUserInfo"
	)!;

	const { emitter } = useEmitter({
		baseUrl: getApiWSBaseUrl(),
		eventName: "getUserInfo",
		io: schema.io,
		namespace: "",
		options: {
			autoConnect: true,
			withCredentials: true,
		},
	});

	useEffect(() => {
		const fn = async () => {
			const response = await emitter({ data: {} });

			console.log("response:", response);
		};
		fn();
	}, [emitter]);

	return <div>hello</div>;
};

export default Messenger;
