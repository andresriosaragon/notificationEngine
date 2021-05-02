import { Schema, Model, Document, Connection } from "mongoose";

import { cachedModelMap, schemaMap } from "../models/models.types";

import { mapObjIndexed } from "ramda";
import { getDbConnection } from "./mongoDbConnector";

const createModel = (
  schemaDefinition: any,
  modelName: string,
  connection: Connection
): Model<typeof schemaDefinition> => {
  const schema = new Schema(schemaDefinition);
  const model = connection.model<typeof schemaDefinition>(modelName, schema);
  return model;
};

const createModels = async (
  schemaObjects: schemaMap,
  cachedModels: cachedModelMap | null
): Promise<cachedModelMap> => {
  if (cachedModels) return cachedModels;
  const connection = await getDbConnection();
  const modelObject = mapObjIndexed(
    (val: Document, key: string) => createModel(val, key, connection),
    schemaObjects
  );
  return modelObject;
};

export { createModels, createModel };
