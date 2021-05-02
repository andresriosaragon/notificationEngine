import { createConnection } from "mongoose";
import { MONGO_URL } from "./constants";

const getDbConnection = async () => {
  const conn = await createConnection(MONGO_URL, {
    // Buffering means mongoose will queue up operations if it gets
    // disconnected from MongoDB and send them when it reconnects.
    // With serverless, better to fail fast if not connected.
    useNewUrlParser: true,
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
  });
  return conn;
};

export { getDbConnection };
