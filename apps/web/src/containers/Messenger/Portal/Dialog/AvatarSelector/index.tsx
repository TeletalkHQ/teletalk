import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { compressor } from "utility-store";

import { Template } from "~/components";
import { useDialogState, useEmitter } from "~/hooks";
import { useGlobalStore } from "~/store";
import { utils } from "~/utils";

import Actions from "./Actions";
import Content from "./Content";

const AvatarSelector = () => {
  const globalStore = useGlobalStore();
  const dialogState = useDialogState("avatarSelector");
  const [avatarSrc, setAvatarSrc] = useState("");
  const { loading, handler } = useEmitter("updateAvatar");
  const editor = useRef<AvatarEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        const src = await utils.convertFileToBase64(file);
        if (typeof src === "string") setAvatarSrc(src as string);
      },
    });
  };

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current.getImage();

      handler.emitFull(
        {
          avatarSrc: canvas.toDataURL(),
        },
        handleClose
      );
    }
  };

  const handleClose = () => {
    globalStore.closeDialog();
    setTimeout(() => {
      setAvatarSrc("");
      if (fileInputRef.current?.value) fileInputRef.current.value = "";
    }, 500);
  };

  return (
    <>
      <Template.Dialog
        actions={
          <Actions
            isSaveDisabled={!avatarSrc}
            loading={loading}
            onClose={handleClose}
            onSave={handleSave}
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
        open={dialogState.open}
      />
    </>
  );
};

export default AvatarSelector;
