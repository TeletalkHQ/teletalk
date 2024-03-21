import { PropsWithChildren, useEffect } from "react";

import {
	useGlobalStore,
	useMessageStore,
	useSettingsStore,
	useUserStore,
} from "~/store";

export const DevLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const state = {
		message: useMessageStore(),
		user: useUserStore(),
		global: useGlobalStore(),
		settings: useSettingsStore(),
	};

	useEffect(() => {
		//@ts-expect-error //FIXME
		window.state = state;
	});

	return <>{children}</>;
};
