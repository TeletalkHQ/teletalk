import { useDialogState } from "@repo/hooks";
import { DialogTemplate, SingleAction } from "@repo/ui";

import { Content } from "./content";
import { Title } from "./title";

export const Settings = () => {
	const dialogState = useDialogState("settings");

	return (
		<DialogTemplate
			actions={<SingleAction closeProps={{ onClick: dialogState.close }} />}
			content={<Content />}
			dialogState={dialogState}
			title={<Title />}
		/>
	);
};
