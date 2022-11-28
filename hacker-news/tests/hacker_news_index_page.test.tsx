/* eslint-disable react/display-name */ // TODO: Adjust linting rules to allow for this.
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import HackerNewsPage from "../pages/hacker-news/index";

jest.mock("components/StoryGroup", () => () => (
  <div data-testid="story-group" />
));
jest.mock("@auth0/nextjs-auth0", () => ({
  withPageAuthRequired: (component: ReactNode) => component,
}));

const mockProps = {
  askStories: [1, 2, 3],
  showStories: [4, 5, 6],
  jobStories: [7, 8, 9],
};

describe("Test HackerNews Page", () => {
  it('should render "Ask Stories" heading', () => {
    render(<HackerNewsPage {...mockProps} />);
    screen.debug();
    expect(
      screen.getByRole("heading", { name: "Ask Stories" })
    ).toBeInTheDocument();
  });
  it('should render "Show Stories" heading', () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(
      screen.getByRole("heading", { name: "Show Stories" })
    ).toBeInTheDocument();
  });
  it('should render "Job Stories" heading', () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(
      screen.getByRole("heading", { name: "Job Stories" })
    ).toBeInTheDocument();
  });
  it("should render 3 StoryGroup components", () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(screen.getAllByTestId("story-group")).toHaveLength(3);
  });
});
