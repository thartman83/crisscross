import { Meta, StoryObj } from '@storybook/react';
import Header, {HeaderProps} from '@/components/composites/header/header';
import { within } from '@storybook/testing-library';
import { fn } from '@storybook/test';
import { expect } from '@storybook/jest';

const onClickHandlerMock = fn();

const meta: Meta<HeaderProps> = {
  title: "Composite Elements/Header/Accessibility Tests",
  component: Header,
  args: {
    onClickHandler: onClickHandlerMock,
  },
  render: (args) => (
    <Header {...args} />
  ),
};

export default meta;

type HeaderStory = StoryObj<HeaderProps>

export const ImageAltText: HeaderStory = {
  args: {
    onClickHandler: onClickHandlerMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    //const toggleElements = canvas.getAllByRole("button", {hidden:true});
    const img = canvas.getByAltText('Criss Cross Logo');

    expect(img).toBeDefined();
  }
};
