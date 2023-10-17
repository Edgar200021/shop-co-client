import type { Meta, StoryObj } from '@storybook/react'

import AdminSidebar from './AdminSidebar'

const meta = {
  title: 'components/AdminSidebar',
  component: AdminSidebar,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof AdminSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
