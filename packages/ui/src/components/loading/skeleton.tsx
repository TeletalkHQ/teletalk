import type {
	SkeletonProps as MuiSkeletonProps } from "@mui/material";
import {
	Skeleton as MuiSkeleton
} from "@mui/material";
import type { CSSProperties } from "react";
import type React from "react";

export interface SkeletonProps extends MuiSkeletonProps {
	isLoading?: boolean;
	children?: React.ReactNode;
	minWidth?: CSSProperties["minWidth"];
}

export const Skeleton = ({
	minWidth,
	isLoading,
	children,
	style,
	...rest
}: SkeletonProps) => {
	if (isLoading) {
		return (
			<MuiSkeleton
				style={{
					...style,
					minWidth: style?.minWidth || minWidth,
				}}
				{...rest}
			/>
		);
	}
	return children;
};
