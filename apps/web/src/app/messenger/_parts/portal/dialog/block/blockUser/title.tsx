import { Typography } from "@repo/ui/typography/typography";

interface Props {
	fullName: string;
}

export const Title: React.FC<Props> = ({ fullName }) => {
	return (
		<Typography>
			<Typography color="warning" component="span" fontWeight="bold">
				Block
			</Typography>{" "}
			{fullName}
		</Typography>
	);
};
