"use client";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { FormSchemaName } from "@repo/schema";
import { useState } from "react";

import {
	FieldWithController,
	FieldWithValidatorWithOptionalNameProps,
} from "../../../base";
import { IconButton } from "../../../base/button";

interface Props<Name extends FormSchemaName>
	extends FieldWithValidatorWithOptionalNameProps<Name> {}

export const Password = <Name extends FormSchemaName>(props: Props<Name>) => {
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
