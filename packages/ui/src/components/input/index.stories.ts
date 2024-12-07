import type { Meta, StoryObj } from "@storybook/react";

import { LoadingButton } from "../button/loading";

export const meta: Meta<typeof LoadingButton> = {
	component: LoadingButton,
};

type Story = StoryObj<typeof LoadingButton>;

export const Primary: Story = {
	args: {
		children: "Button",
		loading: false,
	},
};
