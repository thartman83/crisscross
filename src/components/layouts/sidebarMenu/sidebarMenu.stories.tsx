import { Meta, StoryObj } from '@storybook/react';
import SidebarMenu, { SidebarMenuProps } from './sidebarMenu';
import AppContextProvider from '@/context/applicationContext';

const meta: Meta<SidebarMenuProps> = {
  title: "Layouts/Sidebar Menu",
  component: SidebarMenu,
  render: (args) => (
    <AppContextProvider>
      <SidebarMenu {...args} />
    </AppContextProvider>
  ),
};

export default meta;

type SidebarMenuStory = StoryObj<SidebarMenuProps>

export const ExampleSidebarMenu: SidebarMenuStory = {
  args: {
    menuItems: [
      {
        text: "Menu Item 1",
        onClickHandler: () => {},
        faIcon: "Plus",
      },
      {
        text: "Menu Item 2",
        onClickHandler: () => {},
        faIcon: "Gear",
      },
      {
        text: "Menu Item 3",
        onClickHandler: () => {},
        faIcon: "Share",
      },
      {
        text: "Menu Item 4",
        onClickHandler: () => {},
        faIcon: "Lock",
      },
      {
        text: "Menu Item 4",
        onClickHandler: () => {},
        faIcon: "Circle",
      },
    ],
    openSidebar: true,
  },
};
