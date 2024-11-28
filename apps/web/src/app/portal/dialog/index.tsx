import { AddServer } from "./server/addServer";
import { ServerSetup } from "./server/serverSetup";
import { Servers } from "./server/servers";

export const DialogContainer = () => {
	return (
		<>
			<AddServer />
			<ServerSetup />
			<Servers />
		</>
	);
};
