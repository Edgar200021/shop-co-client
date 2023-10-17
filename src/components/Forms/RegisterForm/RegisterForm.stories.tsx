import type { Meta, StoryObj } from '@storybook/react'

import RegisterForm from './RegisterForm'

const meta = {
  title: 'components/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
