import type { Meta, StoryObj } from '@storybook/react'
import Product from './Product'

const meta = {
  title: 'components/Product',
  component: Product,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof Product>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
