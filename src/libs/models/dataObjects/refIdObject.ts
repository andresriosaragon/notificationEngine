import { Schema } from "mongoose";

const refIdObject = {
  type: Schema.Types.ObjectId,
  required: true,
};

export { refIdObject };
