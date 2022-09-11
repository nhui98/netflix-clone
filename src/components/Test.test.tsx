import { render, screen } from "@testing-library/react";
import Test from "./Test";

describe("test", () => {
  it("works", () => {
    render(<Test />);

    const el = screen.getByText(/hello/i);

    expect(el).not.toBeInTheDocument();
  });
});
