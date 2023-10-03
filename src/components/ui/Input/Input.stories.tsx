import type { Meta, StoryObj } from '@storybook/react'

import Input, { InputVariants } from './Input'

const meta = {
  title: 'ui/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    variant: {
      type: 'string',
      description: 'Variant of input',
	  defaultValue: InputVariants.SEARCH
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Search: Story = {
  args: {
    variant: InputVariants.SEARCH,
  },
}
