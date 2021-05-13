import { cachedModelMap, Document } from "./models.types";

import { createModels } from "../data/createModel";
import { baseDataObject } from "./dataObjects/baseDataObject";
import { refIdObject } from "./dataObjects/refIdObject";
import { SCOPE_SCHEMA } from "./scope";
import { RECIPIENT_SCHEMA } from "./recipient";

interface MessageDocument extends Document {
  templateData: string;
  name: string;
  templateId: string;
  recipients: string[];
  scopeId: string;
}

interface MessageInput {
  templateData: MessageDocument["templateData"];
  name: MessageDocument["name"];
  recipients: MessageDocument["recipients"];
  scopeId: MessageDocument["scopeId"];
}

const MESSAGE_SCHEMA = {
  ...baseDataObject,
  templateData: String,
  templateId: refIdObject,
  recipients: [refIdObject],
};

const createMessageModel = async (cachedModels) => {
  const models = createModels(
    {
      Recipient: RECIPIENT_SCHEMA,
      Scope: SCOPE_SCHEMA,
      Message: MESSAGE_SCHEMA,
    },
    cachedModels
  );
  return models;
};

const createMessage = async (
  models: cachedModelMap,
  data: MessageInput
): Promise<MessageDocument | never> => {
  const { Message, Scope } = models;
  const foundScope = await Scope.exists({ _id: data.scopeId });
  if (!foundScope) {
    throw new Error("Recipient must have an existent scope");
  }
  const created = await new Message(data).save();
  return created;
};

export { MESSAGE_SCHEMA, createMessage, MessageDocument, createMessageModel };
