/* eslint-disable react/display-name */ // TODO: Adjust linting rules to allow for this.
import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import Comment from "../components/Comment";
import { convertUnixTimeToHumanTime } from "../utils/utils"; // TODO: mock this function

const mockComment = {
  by: "mock_by",
  parent: "mock_parent",
  id: "mock_id",
  text: "mock_text",
  time: 1,
  title: "mock_title",
  type: "mock_type",
};

// Bypass actual fetch/useState logic to test Comment component via mocks
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));
const useStateMock: jest.Mock<typeof useState> = useState as never;

describe("Test Comment Component", () => {
  beforeEach(() => {
    const setValue = jest.fn();
    useStateMock.mockImplementation(() => [mockComment, jest.fn()]);
  });

  it("should render the comment author and timestamp", () => {
    render(<Comment commentId={1} />);
    expect(
      screen.getByText(
        `By: ${mockComment.by} ${convertUnixTimeToHumanTime(mockComment.time)}`
      )
    ).toBeInTheDocument();
  });

  it("should render the comment text", () => {
    render(<Comment commentId={1} />);
    expect(screen.getByText(mockComment.text)).toBeInTheDocument();
  });
});
