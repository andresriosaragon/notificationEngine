import { cachedModelMap, Model, Document } from "./models.types";

import { createModels } from "../data/createModel";
import { baseDataObject } from "./dataObjects/baseDataObject";

interface SourceDocument extends Document {
  name: string;
}

interface SourceInput {
  name: SourceDocument["name"];
}

const SOURCE_SCHEMA = {
  ...baseDataObject,
  name: String,
};

const createSourceModel = async (
  cachedSourceModels: cachedModelMap | null
): Promise<cachedModelMap> => {
  const sourceModel = createModels(
    {
      Source: SOURCE_SCHEMA,
    },
    cachedSourceModels
  );
  return sourceModel;
};

const createSource = async (
  Source: Model<SourceDocument>,
  data: SourceInput
): Promise<SourceDocument> => {
  const created = await new Source(data).save();
  return created;
};

const getSourceByName = async (
  Source: Model<SourceDocument>,
  name: string
): Promise<SourceDocument[]> => {
  const found = await Source.find({ name }).exec();
  return found;
};

export {
  createSource,
  createSourceModel,
  getSourceByName,
  SOURCE_SCHEMA,
  SourceDocument,
};
