import { VoidNoArgs } from "@repo/types";
import {
	Div,
	Flex,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
} from "@repo/ui";
import { AccountBoxIcon } from "@repo/ui/accountBox";

interface Props {
	onDrawerIconClick: VoidNoArgs;
}

export const SearchBar: React.FC<Props> = ({ onDrawerIconClick }) => {
	return (
		<Paper
			style={{
				width: "100%",

				height: 50,
				borderRadius: "0px",
				padding: "0px",
			}}
		>
			<Flex ai="center" gap={1} jc="space-between" style={{ width: "100%" }}>
				<Div style={{ padding: "5px 15px" }}>
					<IconButton onClick={onDrawerIconClick}>
						<AccountBoxIcon />
					</IconButton>
				</Div>

				<Div style={{ width: "90%", marginRight: 5 }}>
					<TextField
						fullWidth
						InputProps={{
							style: {
								borderRadius: 10,
							},
							startAdornment: (
								<InputAdornment position="start">
									<AccountBoxIcon />
								</InputAdornment>
							),
						}}
						name="search"
						placeholder="Search"
						size="small"
					/>
				</Div>
			</Flex>
		</Paper>
	);
};
