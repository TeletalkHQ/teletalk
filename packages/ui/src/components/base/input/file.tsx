import { CommonOnChange } from "@repo/types";

interface Props
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	onFileChange: CommonOnChange;
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
