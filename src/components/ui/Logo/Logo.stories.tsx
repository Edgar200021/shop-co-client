import type { Meta, StoryObj } from '@storybook/react'

import Logo from './Logo'

const meta = {
  title: 'ui/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
