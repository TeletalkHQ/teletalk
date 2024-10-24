import {
	Skeleton as MuiSkeleton,
	SkeletonProps as MuiSkeletonProps,
} from "@mui/material";
import React, { CSSProperties } from "react";

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
