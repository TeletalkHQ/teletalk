import { VoidNoArgsFn, VoidWithArg } from "@repo/type-store";

import { Box, Button, Components } from "~/components";
import { ServerAvailabilityStatus, Url } from "~/types";

import AddServerButton from "./AddServerButton";
import ServerSelect from "./ServersSelect";

interface Props {
	disabled: boolean;
	onAddServerClick: VoidNoArgsFn;
	onServersClick: VoidNoArgsFn;
	onServerSelectChange: VoidWithArg<Url>;
	selectedServer: string;
	status: ServerAvailabilityStatus;
}

const ServerSetupContent: React.FC<Props> = ({
	disabled,
	onAddServerClick,
	onServersClick,
	onServerSelectChange,
	selectedServer,
	status,
}) => {
	return (
		<Box.Flex col gap="10px" maxWidth="400px" padding="10px">
			<Components.ServerAvailabilityStatus status={status} />

			<ServerSelect
				disabled={disabled}
				selectedServer={selectedServer}
				onServerSelectChange={onServerSelectChange}
			/>

			<AddServerButton
				disabled={disabled}
				onAddServerClick={onAddServerClick}
			/>

			<Button.Primary disabled={disabled} onClick={onServersClick}>
				Servers
			</Button.Primary>
		</Box.Flex>
	);
};

export default ServerSetupContent;
