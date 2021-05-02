const { createModel, createModels } = require("./createModel");

const testSchema = {
  name: String,
  description: String,
};

const conn = {
  model: (modelName) => modelName,
};

jest.mock("./mongoDbConnector", () => ({
  getDbConnection: async () => conn,
}));

describe("createModel function", () => {
  it("should return created model", async () => {
    const createdModel = createModel(testSchema, "test", conn);
    expect(createdModel).toEqual("test");
  });
});

describe("createModel function", () => {
  it("should return created model", async () => {
    const createdModels = await createModels({ test: testSchema });
    expect(Object.keys(createdModels)).toEqual(["test"]);
  });

  it("should return cached model", async () => {
    const createdModels = await createModels({ test: testSchema }, "cached");
    expect(createdModels).toEqual("cached");
  });
});
