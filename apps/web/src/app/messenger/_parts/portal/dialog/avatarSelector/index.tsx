"use client";

import { useDialogState } from "@repo/hooks/useDialogState";
import { useUpdateUserPublicInfo } from "@repo/hooks/useUpdateUserPublicInfo";
import { DialogTemplate } from "@repo/ui/template/dialog";
import { DoubleAction } from "@repo/ui/template/doubleAction";
import { useRef, useState } from "react";
import type AvatarEditor from "react-avatar-editor";

import { compressor } from "~/classes";
import { convertFileToBase64 } from "~/utils";

import { Content } from "./content";

export const AvatarSelector = () => {
	const dialogState = useDialogState("avatarSelector");
	const [avatarSrc, setAvatarSrc] = useState("");
	const editor = useRef<AvatarEditor | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const { emitter, isLoading } = useUpdateUserPublicInfo();

	const handleOpenFileSelector = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
		e
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		compressor(file, {
			async success(file) {
				const src = await convertFileToBase64(file);
				if (typeof src === "string") setAvatarSrc(src as string);
			},
		});
	};

	const handleSave = () => {
		if (editor.current) {
			const canvas = editor.current.getImage();

			emitter({
				data: {
					avatarSrc: canvas.toDataURL(),
				},
				options: {
					onSuccess: handleClose,
				},
			});
		}
	};

	const handleClose = () => {
		dialogState.close();
		setTimeout(() => {
			setAvatarSrc("");
			if (fileInputRef.current?.value) fileInputRef.current.value = "";
		}, 500);
	};

	return (
		<>
			<DialogTemplate
				actions={
					<DoubleAction
						cancelProps={{
							onClick: handleClose,
						}}
						cancelText="close"
						confirmProps={{
							onClick: handleSave,
							loading: isLoading,
						}}
						confirmText="Save"
					/>
				}
				content={
					<Content
						avatarSrc={avatarSrc}
						editor={editor}
						fileInputRef={fileInputRef}
						onFileChange={handleFileChange}
						onOpenFileSelector={handleOpenFileSelector}
					/>
				}
				dialogState={dialogState}
			/>
		</>
	);
};
