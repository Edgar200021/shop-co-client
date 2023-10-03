import type { Meta, StoryObj } from '@storybook/react'

import Star from './Star'

const meta = {
  title: 'ui/Star',
  component: Star,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Star>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
