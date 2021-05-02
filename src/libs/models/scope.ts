import { cachedModelMap, Document } from "./models.types";

import { createModels } from "../data/createModel";
import { baseDataObject } from "./dataObjects/baseDataObject";
import { SOURCE_SCHEMA } from "./source";
import { refIdObject } from "./dataObjects/refIdObject";

interface ScopeDocument extends Document {
  name: string;
  sourceId: string;
}

interface ScopeInput {
  sourceId: ScopeDocument["sourceId"];
  name: ScopeDocument["name"];
}

interface ScopeQuery {
  sourceId?: ScopeDocument["sourceId"];
  name?: ScopeDocument["name"];
}

const SCOPE_SCHEMA = {
  ...baseDataObject,
  name: String,
  sourceId: refIdObject,
};

const createScopeModel = async (
  cachedModels?: cachedModelMap
): Promise<cachedModelMap> => {
  const scopeModel = createModels(
    {
      Scope: SCOPE_SCHEMA,
      Source: SOURCE_SCHEMA,
    },
    cachedModels
  );
  return scopeModel;
};

const createScope = async (
  models: cachedModelMap,
  data: ScopeInput
): Promise<ScopeDocument | never> => {
  const { Source, Scope } = models;
  const foundSource = await Source.exists({ _id: data.sourceId });
  if (!foundSource) {
    throw new Error("Scope must have an existent source");
  }
  const created = await new Scope(data).save();
  return created;
};

const getScopes = async (
  models: cachedModelMap,
  query: ScopeQuery
): Promise<ScopeDocument[]> => {
  const { Scope } = models;
  const found = await Scope.find(query);
  return found;
};

export {
  SCOPE_SCHEMA,
  createScopeModel,
  createScope,
  getScopes,
  ScopeDocument,
};
