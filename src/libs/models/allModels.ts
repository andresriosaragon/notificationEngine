import { createModels } from "../data/createModel";

import { RECIPIENT_SCHEMA } from "./recipient";
import { SCOPE_SCHEMA } from "./scope";
import { SOURCE_SCHEMA } from "./source";
import { TEMPLATE_STRING_SCHEMA } from "./templateStrings";

const createAllModels = async () => {
  const models = await createModels(
    {
      Recipient: RECIPIENT_SCHEMA,
      Scope: SCOPE_SCHEMA,
      Source: SOURCE_SCHEMA,
      TemplateString: TEMPLATE_STRING_SCHEMA,
    },
    null
  );
  return models;
};

export { createAllModels };
