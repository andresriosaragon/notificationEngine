import { createModels } from "../data/createModel";
import { baseDataObject } from "./dataObjects/baseDataObject";
import { refIdObject } from "./dataObjects/refIdObject";

const messageSchema = {
  ...baseDataObject,
  templateData: String,
  templateId: refIdObject,
  recipients: [refIdObject],
};

const createMessageModel = async (cachedModels) => {
  const models = createModels({
    cachedModels,
    schemaObjects: {
      Recipient: recipientSchema,
      Scope: scopeSchema,
      message: messageSchema,
    },
  });
  return models;
};

const createMessage = async ({ models, data }) => {
  const { Recipient, Scope } = models;
  const foundScope = await Scope.exists({ _id: data.scopeId });
  if (foundScope) {
    const created = await new Recipient(data).save();
    return created;
  }
  return "not created";
};

const getRecipients = async ({ models, query }) => {
  const { Recipient } = models;
  const found = await Recipient.find(query);
  return found;
};

export {
  recipientSchema,
  createRecipientModel,
  createRecipient,
  getRecipients,
};
