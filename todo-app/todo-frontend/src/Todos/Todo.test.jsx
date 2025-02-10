import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";
import { describe, vi } from "vitest";

describe("Todo component", () => {
  //test that blogs info in rendered correctly
  test("renders todos content correctly", () => {
    const todo = {
      _id: "67a460217ac5dde53b544ca7",
      text: "Test todo",
      done: false,
    };

    const mockHandler = vi.fn();

    render(
      <Todo
        todo={todo}
        onClickDelete={mockHandler}
        onClickComplete={mockHandler}
      />
    );

    const text = screen.getByText("Test todo");
    const done = screen.getByText("This todo is not done");
    const setDoneButton = screen.getByText("Set as done");

    expect(text).toBeDefined();
    expect(done).toBeDefined();
    expect(setDoneButton).toBeDefined();
  });

  test("renders todos content correctly 2", () => {
    const todo = {
      _id: "67a460217ac5dde53b544ca7",
      text: "Test todo",
      done: true,
    };

    const mockHandler = vi.fn();

    render(
      <Todo
        todo={todo}
        onClickDelete={mockHandler}
        onClickComplete={mockHandler}
      />
    );

    const text = screen.getByText("Test todo");
    const done = screen.getByText("This todo is done");
    const setDoneButton = screen.queryByText("Set as done");

    expect(text).toBeDefined();
    expect(done).toBeDefined();
    expect(setDoneButton).toBeNull();
  });

  //Test that mocked function/dispatch is called when button is pressed
  test("calls functions when buttons is clicked", async () => {
    const todo = {
      _id: "67a460217ac5dde53b544ca7",
      text: "Test todo",
      done: false,
    };

    const mockHandler1 = vi.fn();
    const mockHandler2 = vi.fn();

    render(
      <Todo
        todo={todo}
        onClickDelete={mockHandler1}
        onClickComplete={mockHandler2}
      />
    );

    const eventUser = userEvent.setup();
    const deleteButton = screen.getByText("Delete");
    const setDoneButton = screen.getByText("Set as done");

    await eventUser.click(deleteButton);
    await eventUser.click(deleteButton);
    await eventUser.click(setDoneButton);

    expect(mockHandler1.mock.calls).toHaveLength(2);
    expect(mockHandler2.mock.calls).toHaveLength(1);
  });
});
