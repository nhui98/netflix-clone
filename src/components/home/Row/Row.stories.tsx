import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RowProps } from "src/types";

import Row from "./Row";
import { RowMockProps } from "./Row.mock";

export default {
  title: "row",
  component: Row,
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args) => <Row {...args} />;

export const Base = Template.bind({});
Base.args = {
  title: "Movies",
  movies: RowMockProps,
} as RowProps;
