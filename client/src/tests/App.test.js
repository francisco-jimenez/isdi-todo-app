import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { getTodoMockResponse } from "./mocks";

const server = setupServer(
  rest.get("http://localhost:5005/api/todo", (req, res, ctx) => {
    return res(ctx.json(getTodoMockResponse));
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
