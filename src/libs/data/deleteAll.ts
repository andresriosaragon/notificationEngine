import { Model, Document, cachedModelMap } from "../models/models.types";

const deleteAll = async (Model: Model<Document>) => {
  await Model.deleteMany().exec();
};

const deleteAllCollections = async (Models: cachedModelMap) => {
  const promiseArray = Object.values(Models).map(deleteAll);
  await Promise.all(promiseArray);
};

export { deleteAll, deleteAllCollections };
