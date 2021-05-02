import { cachedModelMap, Document } from "./models.types";

import { createModels } from "../data/createModel";
import { baseDataObject } from "./dataObjects/baseDataObject";
import { refIdObject } from "./dataObjects/refIdObject";
import { SCOPE_SCHEMA } from "./scope";

interface RecipientDocument extends Document {
  name: string;
  email: string;
  phone: string;
  scopeId: string;
}

interface RecipientInput {
  name: RecipientDocument["name"];
  email: RecipientDocument["email"];
  phone: RecipientDocument["phone"];
  scopeId: RecipientDocument["scopeId"];
}

interface RecipientQuery {
  name: RecipientDocument["name"];
  scopeId: RecipientDocument["scopeId"];
}

const RECIPIENT_SCHEMA = {
  ...baseDataObject,
  name: String,
  email: String,
  phone: String,
  scopeId: refIdObject,
};

const createRecipientModel = async (
  cachedModels?: cachedModelMap
): Promise<cachedModelMap> => {
  const models = createModels(
    {
      Recipient: RECIPIENT_SCHEMA,
      Scope: SCOPE_SCHEMA,
    },
    cachedModels
  );
  return models;
};

const createRecipient = async (
  models: cachedModelMap,
  data: RecipientInput
): Promise<RecipientDocument | never> => {
  const { Recipient, Scope } = models;
  const foundScope = await Scope.exists({ _id: data.scopeId });
  if (!foundScope) {
    throw new Error("Recipient must have an existent scope");
  }
  const created = await new Recipient(data).save();
  return created;
};

const getRecipients = async (
  models: cachedModelMap,
  query: RecipientQuery
): Promise<Document[]> => {
  const { Recipient } = models;
  const found = await Recipient.find(query);
  return found;
};

export {
  RECIPIENT_SCHEMA,
  createRecipientModel,
  createRecipient,
  getRecipients,
  RecipientDocument,
};
