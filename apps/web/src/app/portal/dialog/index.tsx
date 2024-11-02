import AddServer from "./addServer";
import ServerSetup from "./serverSetup";
import Servers from "./servers";

export const DialogContainer = () => {
	return (
		<>
			<AddServer />
			<ServerSetup />
			<Servers />
		</>
	);
};
