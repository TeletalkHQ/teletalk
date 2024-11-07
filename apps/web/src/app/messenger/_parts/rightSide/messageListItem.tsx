import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Box, Typography } from "@repo/ui";
import { CSSProperties } from "react";

interface Props {
	chatDate: string;
	justify: CSSProperties["justifyContent"];
	message: string;
	messageTime: string;
	// transitionDirection: SlideProps["direction"];
}

const MessageListItem: React.FC<Props> = ({
	chatDate,
	// transitionDirection,
	justify,
	message,
	messageTime,
}) => {
	return (
		<>
			<Box.Flex justifyContent={justify} style={{ padding: 3 }}>
				{/* <Transitions.Slide
          direction={transitionDirection}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
				<Box.Paper
					// onContextMenu={(e) => onOtherStateChange(e)}
					elevation={0}
					style={{ padding: 5, borderRadius: 10 }}
				>
					<Typography.Base style={{ wordBreak: "break-word" }}>
						{message}
					</Typography.Base>

					<Box.Flex
						alignItems="center"
						gap={0.2}
						justifyContent="flex-end"
						style={{ fontSize: 12 }}
					>
						<Typography.GreyTextParagraph>
							{messageTime || "12:24"}
						</Typography.GreyTextParagraph>
						<Typography.GreyTextParagraph>
							{chatDate}
						</Typography.GreyTextParagraph>
						<Typography.GreyTextParagraph>
							<DoneAllIcon fontSize="small" />
						</Typography.GreyTextParagraph>
					</Box.Flex>
				</Box.Paper>
				{/* </Transitions.Slide> */}
			</Box.Flex>
		</>
	);
};

export default MessageListItem;
