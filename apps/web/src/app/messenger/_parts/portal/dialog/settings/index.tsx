import { useDialogState } from "@repo/hooks";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { SingleAction } from "@repo/ui/template/singleAction";

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
