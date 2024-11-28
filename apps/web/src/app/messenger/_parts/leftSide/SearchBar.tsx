import { VoidNoArgs } from "@repo/types";
import {
	Box,
	IconButton,
	InputAdornment,
	MenuIcon,
	SearchIcon,
	TextField,
} from "@repo/ui";

interface Props {
	onDrawerIconClick: VoidNoArgs;
}

export const SearchBar: React.FC<Props> = ({ onDrawerIconClick }) => {
	return (
		<Box.Paper
			style={{
				width: "100%",

				height: 50,
				borderRadius: "0px",
				padding: "0px",
			}}
		>
			<Box.Flex
				ai="center"
				gap={1}
				jc="space-between"
				style={{ width: "100%" }}
			>
				<Box.Div style={{ padding: "5px 15px" }}>
					<IconButton onClick={onDrawerIconClick}>
						<MenuIcon />
					</IconButton>
				</Box.Div>

				<Box.Div style={{ width: "90%", marginRight: 5 }}>
					<TextField
						fullWidth
						InputProps={{
							style: {
								borderRadius: 10,
							},
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						name="search"
						placeholder="Search"
						size="small"
					/>
				</Box.Div>
			</Box.Flex>
		</Box.Paper>
	);
};
