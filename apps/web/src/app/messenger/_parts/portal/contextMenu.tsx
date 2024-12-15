import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContextMenuStore } from "@repo/store";
import * as React from "react";

export default function ContextMenu() {
	const { contextMenu, closeMenu } = useContextMenuStore((state) => ({
		contextMenu: state.menu,
		closeMenu: state.closeMenu,
	}));

	const handleClose = () => {
		closeMenu();
	};

	const isMenuShowable =
		!!contextMenu.list.length &&
		!!contextMenu.position?.mouseX &&
		!!contextMenu.position.mouseY;

	return (
		isMenuShowable && (
			<Menu
				anchorPosition={
					contextMenu.position !== null
						? {
								top: contextMenu.position.mouseY,
								left: contextMenu.position.mouseX,
							}
						: undefined
				}
				anchorReference="anchorPosition"
				open={contextMenu.position !== null}
				onClose={handleClose}
			>
				{contextMenu.list.map((item, index) => (
					<MenuItem key={index} onClick={item.handler}>
						{item.text}
					</MenuItem>
				))}
			</Menu>
		)
	);
}
