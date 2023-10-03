import type { Meta, StoryObj } from '@storybook/react'
import ProductStars from './Stars'


const meta = {
  title: 'components/ProductStars',
  component: ProductStars,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    averageRating: {
      type: 'number',
      description: 'Rating of product',
      defaultValue: 5,
    },
    count: {
      type: 'number',
      description: 'Count of stars',
      defaultValue: 5,
    },
  },
} satisfies Meta<typeof ProductStars>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    averageRating: 5,
  },
}
