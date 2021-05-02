import { render } from "ejs";

import { cachedModelMap, Document } from "./models.types";

import { createModels } from "../data/createModel";
import { baseDataObject } from "./dataObjects/baseDataObject";
import { SOURCE_SCHEMA } from "./source";
import { refIdObject } from "./dataObjects/refIdObject";

const TEMPLATE_STRING_SCHEMA = {
  ...baseDataObject,
  name: { type: String, required: true, unique: true },
  emailContent: { type: String },
  smsContent: { type: String },
  sourceId: refIdObject,
};

interface TemplateStringDocument extends Document {
  name: string;
  emailContent: string;
  smsContent: string;
  sourceId: string;
  templateTestData: string;
}

interface TemplateStringResult {
  emailContent: string;
  smsContent: string;
}

interface TemplateStringInput {
  name: TemplateStringDocument["name"];
  emailContent: TemplateStringDocument["emailContent"];
  smsContent: TemplateStringDocument["smsContent"];
  sourceId: TemplateStringDocument["sourceId"];
  templateTestData: TemplateStringDocument["templateTestData"];
}

const createTemplateStringModel = async (
  cachedModels: cachedModelMap
): Promise<cachedModelMap> => {
  const models = createModels(
    {
      TemplateString: TEMPLATE_STRING_SCHEMA,
      Source: SOURCE_SCHEMA,
    },
    cachedModels
  );
  return models;
};

const createTemplateString = async (
  models: cachedModelMap,
  data: TemplateStringInput
): Promise<TemplateStringDocument | never> => {
  const { TemplateString, Source } = models;
  const foundSource = await Source.exists({ _id: data.sourceId });
  if (!foundSource) {
    throw new Error("Recipient must have an existent scope");
  }
  const { emailContent, smsContent, templateTestData } = data;
  const parsedData = JSON.parse(templateTestData);
  // we will try to render a test message with the template test to validate
  // that the template is properly written
  console.log(render);
  render(emailContent, { data: parsedData });
  render(smsContent, { data: parsedData });
  const created = await new TemplateString(data).save();
  return created;
};

const createTemplatedString = async (
  models: any,
  templateId: string,
  templateData: object
): Promise<TemplateStringResult> => {
  const { TemplateString } = models;
  const { emailContent, smsContent } = await TemplateString.findOne({
    _id: templateId,
  });
  const rendered = {
    emailContent: render(emailContent, { data: templateData }),
    smsContent: render(smsContent, { data: templateData }),
  };
  return rendered;
};

export {
  TEMPLATE_STRING_SCHEMA,
  createTemplateStringModel,
  createTemplateString,
  createTemplatedString,
  TemplateStringDocument,
};
