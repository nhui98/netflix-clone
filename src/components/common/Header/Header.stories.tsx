import { ComponentMeta, ComponentStory } from "@storybook/react";

import Header from "./Header";

export default {
  title: "header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Base = Template.bind({});
