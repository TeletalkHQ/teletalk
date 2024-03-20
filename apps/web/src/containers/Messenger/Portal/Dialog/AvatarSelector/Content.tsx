import AvatarEditor from "react-avatar-editor";

import { Box, Button } from "~/components";
import { CommonOnChange, VoidNoArgsFn } from "~/types";

interface Props {
  avatarSrc: string;
  editor: React.MutableRefObject<AvatarEditor | null>;
  onFileChange: CommonOnChange;
  onOpenFileSelector: VoidNoArgsFn;
  fileInputRef: React.LegacyRef<HTMLInputElement>;
}

const Content: React.FC<Props> = ({
  avatarSrc,
  editor,
  fileInputRef,
  onFileChange,
  onOpenFileSelector,
}) => {
  return (
    <>
      <Box.Flex
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
            <Button.Primary
              style={{
                width: "max-content",
              }}
              onClick={onOpenFileSelector}
            >
              Select
            </Button.Primary>
          </>
        )}

        <input
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
          onChange={onFileChange}
        />
      </Box.Flex>
    </>
  );
};

export default Content;
