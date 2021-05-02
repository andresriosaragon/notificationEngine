import { deleteAllCollections } from "../data/deleteAll";
import { createAllModels } from "./allModels";
import { createSource } from "./source";
import { createScope } from "./scope";
import { createRecipient } from "./recipient";
import { createTemplateString } from "./templateStrings";

const templateStringData = {
  emailContent: `<h2>News on your vehicle</h2>
      <p>The service <%= data.serviceName %></p>
      <p>For the vehicle <%= data.displayName %> scheduled </p>
      `,
  smsContent: `The service <%= data.serviceName %>  For the vehicle <%= data.displayName %> was scheduled `,
  name: "testTemplate1",
  templateTestData: JSON.stringify({
    serviceName: "the service",
    displayName: "the vehicle",
  }),
};

describe("test add function", () => {
  it("should return 15 for add(10,5)", async () => {
    console.log("Creating models");
    const models = await createAllModels();
    const { Source, Recipient, Scope, TemplateString } = models;
    console.log("Deleting existing data");
    await deleteAllCollections(models);
    const { _id: sourceId, name: sourceName } = await createSource(Source, {
      name: "firstSource",
    });
    expect(sourceName).toBe("firstSource");
    const { _id: scopeId, name: scopeName } = await createScope(
      { Scope, Source },
      {
        name: "firstScope",
        sourceId,
      }
    );

    expect(scopeName).toBe("firstScope");
    const { name: recipientName } = await createRecipient(
      { Scope, Recipient },
      {
        name: "firstRecipient",
        email: "first@user.com",
        phone: "2313123",
        scopeId,
      }
    );
    expect(recipientName).toBe("firstRecipient");
    const { name: templateName } = await createTemplateString(
      { TemplateString, Source },
      { ...templateStringData, sourceId }
    );
    expect(templateName).toBe("testTemplate1");
  });
});
