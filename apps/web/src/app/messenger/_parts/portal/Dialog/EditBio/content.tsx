import { Box, OnInputChange, Typography } from "@repo/ui";

interface Props {
	bio: string;
	onChange: OnInputChange;
}

export const Content: React.FC<Props> = ({ bio, onChange }) => {
	return (
		<Box.Flex
			col
			style={{
				maxWidth: 400,
			}}
		>
			{/* <TextWithValidator.Bio value={bio} onChange={onChange} /> */}
			<Typography variant="greyCaption">
				any details such as age, occupation or city. Example: 23 y.o. designer
				from San Francisco
			</Typography>
		</Box.Flex>
	);
};
