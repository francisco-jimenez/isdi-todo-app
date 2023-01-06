import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";
import {
  getTodoMockResponse,
  deleteTodoMockResponse,
  updateTodoMockResponse,
  createTodoMockResponse,
} from "./mocks";

const server = setupServer(
  rest.get("http://localhost:5005/api/todo", (req, res, ctx) => {
    return res(ctx.json(getTodoMockResponse));
  }),
  rest.delete(
    "http://localhost:5005/api/todo/63b74451b5645a976f0d6db8",
    (req, res, ctx) => {
      return res(ctx.json(deleteTodoMockResponse));
    }
  ),
  rest.put(
    "http://localhost:5005/api/todo/63b74451b5645a976f0d6db8",
    (req, res, ctx) => {
      return res(ctx.json(updateTodoMockResponse));
    }
  ),
  rest.post("http://localhost:5005/api/todo", (req, res, ctx) => {
    return res(ctx.json(createTodoMockResponse), ctx.status(201));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays header and todos", async () => {
  render(<App />);

  expect(screen.getByTestId("main-header")).toHaveTextContent("Mis todos");
  await waitFor(() => screen.getAllByTestId("single-todo"));
  expect(screen.getAllByTestId("single-todo")).toHaveLength(3);
});

test("it deletes a todo", async () => {
  render(<App />);

  await waitFor(() => screen.getAllByTestId("single-todo"));
  const deleteTodoButtons = screen.getAllByTestId("delete-button");
  fireEvent.click(deleteTodoButtons[0]);
  await waitFor(() => {
    expect(screen.getAllByTestId("single-todo")).toHaveLength(2);
  });
});

test("it updates a todo", async () => {
  render(<App />);

  await waitFor(() => screen.getAllByTestId("single-todo"));
  const completeTodoButtons = screen.getAllByTestId("complete-button");
  fireEvent.click(completeTodoButtons[0]);
  await waitFor(() => {
    expect(screen.getAllByTestId("complete-button")).toHaveLength(2);
  });
});

test("it creates a todo", async () => {
  render(<App />);

  await waitFor(() => screen.getAllByTestId("single-todo"));
  const name = screen.getByTestId("name");
  const description = screen.getByTestId("description");

  fireEvent.change(name, { target: { value: "name test" } });
  fireEvent.change(description, { target: { value: "description test" } });

  await waitFor(() => screen.getByTestId("add-button"));
  const addButton = screen.getByTestId("add-button");
  userEvent.click(addButton);
  await waitFor(() => {
    expect(screen.getAllByTestId("single-todo")).toHaveLength(4);
  });
});
