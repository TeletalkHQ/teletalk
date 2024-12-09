import { type VoidNoArgs } from "@repo/types";
import { Flex } from "@repo/ui/box/flex";
import { Button } from "@repo/ui/button/button";
import { type OnInputChange } from "@repo/ui/types";
import AvatarEditor from "react-avatar-editor";

interface Props {
	avatarSrc: string;
	editor: React.MutableRefObject<AvatarEditor | null>;
	onFileChange: OnInputChange;
	onOpenFileSelector: VoidNoArgs;
	fileInputRef: React.LegacyRef<HTMLInputElement>;
}

export const Content: React.FC<Props> = ({
	avatarSrc,
	editor,
	fileInputRef,
	onFileChange,
	onOpenFileSelector,
}) => {
	return (
		<Flex
			ai="center"
			col
			jc="center"
			style={{
				width: "100%",
				minWidth: "300px",
				height: "300px",
			}}
		>
			{avatarSrc ? (
				<AvatarEditor
					border={25}
					borderRadius={222}
					color={[255, 255, 255, 0.6]} // RGBA
					height={200}
					image={avatarSrc}
					ref={editor}
					rotate={0}
					scale={1.2}
					style={{
						borderRadius: "10px",
					}}
					width={200}
				/>
			) : (
				<>
					<Button
						style={{
							width: "max-content",
						}}
						onClick={onOpenFileSelector}
					>
						Select
					</Button>
				</>
			)}

			<input
				accept="image/png, image/jpeg"
				ref={fileInputRef}
				style={{ display: "none" }}
				type="file"
				onChange={onFileChange}
			/>
		</Flex>
	);
};
