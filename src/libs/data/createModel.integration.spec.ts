import { createModel } from "./createModel";
import { getDbConnection } from "./mongoDbConnector";

const testSchema = {
  name: String,
  description: String,
};

describe("createModel function", () => {
  it("should return created model", async () => {
    const conn = await getDbConnection();
    const createdModel = createModel(testSchema, "test", conn);
    expect(createdModel.insertMany instanceof Function).toBe(true);
  });
});
