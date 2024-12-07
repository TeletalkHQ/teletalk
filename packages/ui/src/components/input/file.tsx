import { ChangeEventHandler } from "react";

export type OnFileChange = ChangeEventHandler<HTMLInputElement> | undefined;

interface Props
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	onFileChange: OnFileChange;
	fileInputRef: React.LegacyRef<HTMLInputElement>;
}

export const File: React.FC<Props> = ({ fileInputRef, onFileChange }) => {
	return (
		<input
			accept="image/png, image/jpeg"
			ref={fileInputRef}
			style={{
				display: "none",
			}}
			type="file"
			onChange={onFileChange}
		/>
	);
};
