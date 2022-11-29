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
  it('should render "Ask Stories" summary', () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(
      screen.getByText("Ask Stories", { selector: "summary" })
    ).toBeInTheDocument();
  });
  it('should render "Show Stories" summary', () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(
      screen.getByText("Show Stories", { selector: "summary" })
    ).toBeInTheDocument();
  });
  it('should render "Job Stories" summary', () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(
      screen.getByText("Job Stories", { selector: "summary" })
    ).toBeInTheDocument();
  });
  it("should render three StoryGroup components", () => {
    render(<HackerNewsPage {...mockProps} />);
    expect(screen.getAllByTestId("story-group")).toHaveLength(3);
  });
});
