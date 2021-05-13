import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { createSourceModel, createSource } from "@libs/models/source";

import schema from "./schema";

let models = null;

const createSourceHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: any) => {
    models = await createSourceModel(models);
    const body = JSON.parse(event.body);
    const { _id: sourceId, name: sourceName } = await createSource(
      models.Source,
      body
    );
    return formatJSONResponse({ _id: sourceId, name: sourceName });
  };

export const main = createSourceHandler;
