"use client";

// TODO: Move to icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import type { ZodSchema } from "zod";

import { IconButton } from "../../button/icon";
import type {
	FieldWithValidatorWithOptionalNameProps } from "./fieldWithController";
import {
	FieldWithController
} from "./fieldWithController";

interface Props<T extends ZodSchema>
	extends FieldWithValidatorWithOptionalNameProps<T> {}

export const Password = <T extends ZodSchema>(props: Props<T>) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<FieldWithController
			hiddenLabel
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							edge="end"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
			name="password"
			placeholder="Password"
			required
			type={showPassword ? "text" : "password"}
			{...props}
		/>
	);
};