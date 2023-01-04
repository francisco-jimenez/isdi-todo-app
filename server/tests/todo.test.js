const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config();

/* Cleaning database after running test suite */
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.collections["todos"].drop();
});

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Get todos with an empty collection", () => {
  it("should return code 200 and an empty array", async () => {
    const response = await request(app).get("/api/todo");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ todos: [] });
  });
});

describe("Add a new todo", () => {
  it("should return created todo, updated list of todos and code 201", async () => {
    const response = await request(app).post("/api/todo").send({
      name: "activity1",
      description: "description1",
      status: false,
    });
    expect(response.body.message).toEqual("Todo added");

    expect(response.body).toEqual(
      expect.objectContaining({
        todo: expect.objectContaining({
          name: "activity1",
          description: "description1",
          status: false,
        }),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        todos: expect.arrayContaining([
          expect.objectContaining({
            name: "activity1",
            description: "description1",
            status: false,
          }),
        ]),
      })
    );

    expect(response.statusCode).toBe(201);
  });
});

describe("Add a second todo", () => {
  it("should return created todo, updated list of todos and code 201", async () => {
    const response = await request(app).post("/api/todo").send({
      name: "activity2",
      description: "description2",
      status: false,
    });
    expect(response.body.message).toEqual("Todo added");

    expect(response.body).toEqual(
      expect.objectContaining({
        todo: expect.objectContaining({
          name: "activity2",
          description: "description2",
          status: false,
        }),
      })
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        todos: expect.arrayContaining([
          expect.objectContaining({
            name: "activity1",
            description: "description1",
            status: false,
          }),
          expect.objectContaining({
            name: "activity2",
            description: "description2",
            status: false,
          }),
        ]),
      })
    );

    expect(response.statusCode).toBe(201);
  });
});
describe("Get todos", () => {
  it("should return code 200 and two todos", async () => {
    const response = await request(app).get("/api/todo");
    expect(response.statusCode).toBe(200);
    expect(response.body.todos).toHaveLength(2);
  });
});

describe("Modify first todo to status true", () => {
  it("should return code 200, the new todo and the list already updated", async () => {
    const responseGet = await request(app).get("/api/todo");
    const firstTodoId = responseGet.body.todos[0]._id;

    const response = await request(app).put(`/api/todo/${firstTodoId}`).send({
      status: true,
    });

    expect(response.statusCode).toBe(200);

    expect((response.body.todo.status = true));

    expect(response.body).toEqual(
      expect.objectContaining({
        todos: expect.arrayContaining([
          expect.objectContaining({
            _id: firstTodoId,
            status: true,
          }),
        ]),
      })
    );
  });
});

describe("Deleting first todo", () => {
  it("should return code 200 and the list without this todo", async () => {
    const responseGet = await request(app).get("/api/todo");
    const firstTodoId = responseGet.body.todos[0]._id;

    const response = await request(app).delete(`/api/todo/${firstTodoId}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.todos).toHaveLength(1);
  });
});

describe("Call to an unknow endpoint ", () => {
  it("should return 404", async () => {
    const response = await request(app).get("/fakeAPI/todo");

    expect(response.statusCode).toBe(404);
  });
});

describe("Add a new todo without name", () => {
  it("should return an error 400 of bad request", async () => {
    const response = await request(app).post("/api/todo").send({
      description: "description3",
      status: false,
    });

    expect(response.statusCode).toBe(400);
  });
});
describe("Add a new todo without description", () => {
  it("should return an error 400 of bad request", async () => {
    const response = await request(app).post("/api/todo").send({
      name: "name3",
      status: false,
    });

    expect(response.statusCode).toBe(400);
  });
});
