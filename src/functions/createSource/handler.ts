import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { createSourceModel } from "@libs/models/source";

import schema from "./schema";

let sourceModel = null;

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  sourceModel = await createSourceModel(sourceModel);
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = hello;
