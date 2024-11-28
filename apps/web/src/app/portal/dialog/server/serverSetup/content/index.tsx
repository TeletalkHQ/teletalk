import { ServerAvailabilityStatusType } from "@repo/hooks";
import { VoidNoArgs, VoidWithArg } from "@repo/types";
import { Box, Button } from "@repo/ui";

import { ServerAvailabilityStatus } from "../../serverAvailabilityStatus";
import { AddServerButton } from "./addServerButton";
import { ServerSelect } from "./serversSelect";

interface Props {
	disabled: boolean;
	onAddServerClick: VoidNoArgs;
	onServerSelectChange: VoidWithArg<number>;
	onServersClick: VoidNoArgs;
	selectedServerId: number | undefined;
	status: ServerAvailabilityStatusType;
}

export const Content: React.FC<Props> = ({
	disabled,
	onAddServerClick,
	onServersClick,
	onServerSelectChange,
	selectedServerId,
	status,
}) => {
	return (
		<Box.Flex col gap="10px" maxWidth="400px" padding="10px">
			<ServerAvailabilityStatus status={status} />

			<ServerSelect
				disabled={disabled}
				selectedServerId={selectedServerId}
				onServerSelectChange={onServerSelectChange}
			/>

			<Box.Flex fullWidth gap={"8px"}>
				<AddServerButton
					disabled={disabled}
					onAddServerClick={onAddServerClick}
				/>

				<Button disabled={disabled} onClick={onServersClick}>
					Servers
				</Button>
			</Box.Flex>
		</Box.Flex>
	);
};
