import { useConfigs } from "@repo/hooks/useConfigs";
import { Div } from "@repo/ui/box/div";
import { Typography } from "@repo/ui/typography/typography";

interface Props {
	fullName: string;
}

export const Content: React.FC<Props> = ({ fullName }) => {
	const { configs } = useConfigs();

	return (
		<Div className="w-full">
			<Typography variant="body1">
				Are you sure you want to
				<Typography color="warning" component="span" fontWeight="bold">
					{" "}
					block
				</Typography>{" "}
				<Typography component="span" fontWeight="bold">
					{fullName}
				</Typography>{" "}
				from messaging and calling you on {configs.app.label}?
			</Typography>
		</Div>
	);
};
