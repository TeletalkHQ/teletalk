import { Flex } from "@repo/ui/box/flex";
import { Paper } from "@repo/ui/box/paper";
import { DoneAllIcon } from "@repo/ui/icons/doneAll";
import { Typography } from "@repo/ui/typography/typography";
import { CSSProperties } from "react";

interface Props {
	chatDate: string;
	justify: CSSProperties["justifyContent"];
	message: string;
	messageTime: string;
	// transitionDirection: SlideProps["direction"];
}

export const MessageListItem: React.FC<Props> = ({
	chatDate,
	// transitionDirection,
	justify,
	message,
	messageTime,
}) => {
	return (
		<>
			<Flex justifyContent={justify} style={{ padding: 3 }}>
				{/* <Transitions.Slide
          direction={transitionDirection}
          in={true}
          mountOnEnter
          unmountOnExit
        > */}
				<Paper
					// onContextMenu={(e) => onOtherStateChange(e)}
					elevation={0}
					style={{ padding: 5, borderRadius: 10 }}
				>
					<Typography style={{ wordBreak: "break-word" }}>{message}</Typography>

					<Flex
						alignItems="center"
						gap={0.2}
						justifyContent="flex-end"
						style={{ fontSize: 12 }}
					>
						<Typography variant="caption">{messageTime || "12:24"}</Typography>

						<Typography variant="caption">{chatDate}</Typography>

						<Typography variant="caption">
							<DoneAllIcon fontSize="small" />
						</Typography>
					</Flex>
				</Paper>
				{/* </Transitions.Slide> */}
			</Flex>
		</>
	);
};
