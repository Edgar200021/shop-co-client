import type { Meta, StoryObj } from '@storybook/react'

import Brands from './Brands'

const meta = {
  title: 'components/Brands',
  component: Brands,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Brands>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
