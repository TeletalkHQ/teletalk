"use client";

import type { SwitchProps } from "@mui/material";
import { Switch as MuiSwitch, styled } from "@mui/material";

import type { SkeletonProps } from "../loading/skeleton";
import { Skeleton } from "../loading/skeleton";

interface Props extends SwitchProps {
	loading?: boolean;
	loadingProps?: SkeletonProps;
}

const SwitchWithLoading: React.FC<Props> = ({
	loading,
	loadingProps,
	style,
	...rest
}) => (
	<>
		{loading ? (
			<Skeleton {...loadingProps} width={style?.width || "100%"} />
		) : (
			<MuiSwitch {...rest}></MuiSwitch>
		)}
	</>
);

export const Switch: typeof SwitchWithLoading = styled(SwitchWithLoading)(
	({ theme }) => ({
		padding: 8,
		"& .MuiSwitch-track": {
			borderRadius: 22 / 2,
			"&:before, &:after": {
				content: "''",
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				width: 16,
				height: 16,
			},
			"&:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
					theme.palette.getContrastText(theme.palette.primary.main)
				)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
				left: 12,
			},
			"&:after": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
					theme.palette.getContrastText(theme.palette.primary.main)
				)}" d="M19,13H5V11H19V13Z" /></svg>')`,
				right: 12,
			},
		},
		"& .MuiSwitch-thumb": {
			boxShadow: "none",
			width: 16,
			height: 16,
			margin: 2,
		},
	})
);