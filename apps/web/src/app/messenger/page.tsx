"use client";

import { useEffect } from "react";

import { useMainEmitter } from "~/hooks";

const Messenger = () => {
	const { emitter } = useMainEmitter({ name: "getUserPublicInfo" });

	useEffect(() => {
		const fn = async () => {
			const response = await emitter({
				data: { userId: "1231212312312321313112312312313123" },
			});
			console.log("response:", response);
		};
		fn();
	}, [emitter]);

	return <div>hello</div>;
};

export default Messenger;
