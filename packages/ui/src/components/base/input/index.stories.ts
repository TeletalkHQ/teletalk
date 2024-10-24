import type { Meta, StoryObj } from "@storybook/react";

import { LoadingButton } from "../button";

const meta: Meta<typeof LoadingButton> = {
	component: LoadingButton,
};

export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Primary: Story = {
	args: {
		children: "Button",
		loading: false,
	},
};
