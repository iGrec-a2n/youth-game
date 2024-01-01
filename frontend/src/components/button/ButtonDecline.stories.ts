import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ButtonDecline } from './ButtonDecline';

const meta = {
    title: 'Components/ButtonDecline',
    component: ButtonDecline,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {

    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof ButtonDecline>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        type: 'primary',
        label: 'Resume the game',

        disabled: false,
        className: 'button-style',
    },
};
export const Secondary: Story = {
    args: {
        type: 'secondary',
        label: 'Join the game',
        disabled: true,
        className: 'button-style',
    },
};
export const Tertiary: Story = {
    args: {
        type: 'tertiary',
        label: 'validate answer',

        disabled: true,
        className: 'button-style',
    },
};