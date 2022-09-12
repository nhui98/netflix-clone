import { ComponentMeta, ComponentStory } from "@storybook/react";
import Spinner from "./Spinner";

export default {
  title: "spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const Base = Template.bind({});
