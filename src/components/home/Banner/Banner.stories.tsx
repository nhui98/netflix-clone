import { ComponentMeta, ComponentStory } from "@storybook/react";
import Banner, { BannerProps } from "./Banner";
import { BannerMockProps } from "./Banner.mock";

export default {
  title: "banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Base = Template.bind({});
Base.args = {
  netflixOriginals: BannerMockProps,
} as BannerProps;
