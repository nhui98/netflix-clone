import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ThumbnailProps } from "src/types";

import Thumbnail from "./Thumbnail";
import { ThumbnailMockProps } from "./Thumbnail.mock";

export default {
  title: "thumbnail",
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>;

const Template: ComponentStory<typeof Thumbnail> = (args) => (
  <Thumbnail {...args} />
);

export const Base = Template.bind({});
Base.args = {
  movie: ThumbnailMockProps,
} as ThumbnailProps;
