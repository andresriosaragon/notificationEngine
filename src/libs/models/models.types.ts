import { Model, Document } from "mongoose";
import { SourceDocument } from "./source";
import { ScopeDocument } from "./scope";
import { RecipientDocument } from "./recipient";
import { TemplateStringDocument } from "./templateStrings";

interface cachedModelMap {
  Source?: Model<SourceDocument>;
  Scope?: Model<ScopeDocument>;
  Recipient?: Model<RecipientDocument>;
  TemplateString?: Model<TemplateStringDocument>;
}

interface schemaMap {
  Source?: object;
  Scope?: object;
  Recipient?: object;
  TemplateString?: object;
}

export { cachedModelMap, schemaMap, Model, Document };
