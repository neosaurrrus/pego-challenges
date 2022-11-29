/* eslint-disable react/display-name */ // TODO: Adjust linting rules to allow for this.
import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import Story from "../components/Story";

const mockStory = {
  by: "mock_by",
  descendants: "mock_descendants",
  id: "mock_id",
  kids: ["mock_kids"],
  score: 1, // mock Value
  time: "mock_time",
  title: "mock_title",
  type: "mock_type",
  url: "mock_url",
};

// Bypass actual fetch/useState logic to test Story component via mocks
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));
const useStateMock: jest.Mock<typeof useState> = useState as never;

jest.mock("components/UserDetails", () => () => (
  <div data-testid="mock-user-details" />
));

jest.mock("components/Comment", () => () => (
  <div data-testid="mock-comment-component" />
));

describe("Test Story Component", () => {
  beforeEach(() => {
    const setValue = jest.fn();
    // TODO: Figure out how to mock useState properly to set multiple states
    useStateMock.mockImplementation(() => [mockStory, jest.fn()]);
  });

  describe("Test title", () => {
    it("should render the correct title as an anchor tag if url is present", () => {
      render(<Story storyId={1} />);
      expect(
        screen.getByRole("link", { name: "mock_title" })
      ).toBeInTheDocument();
    });

    it("should not render the title as an anchor tag if url is not present", () => {
      useStateMock.mockImplementation(() => [
        { ...mockStory, url: "" },
        jest.fn(),
      ]);

      render(<Story storyId={1} />);
      expect(
        screen.queryByRole("link", { name: "mock_title" })
      ).not.toBeInTheDocument();
      expect(screen.getByText("mock_title")).toBeInTheDocument();
    });
  });

  describe("Test score", () => {
    it("should render the correct score", () => {
      render(<Story storyId={1} />);
      expect(screen.getByText(`Score: ${mockStory.score}`)).toBeInTheDocument();
    });
  });

  describe("Test user details", () => {
    it("should render the user details", () => {
      render(<Story storyId={1} />);
      expect(screen.getByTestId("mock-user-details")).toBeInTheDocument();
    });
  });

  describe("Test comments", () => {
    it("should render the comments", () => {
      render(<Story storyId={1} />);
      expect(screen.getByTestId("mock-comment-component")).toBeInTheDocument();
    });
  });
});
