require("dotenv").config();
const password = process.env.DB_PASSWORD;

const MONGO_URL = `mongodb+srv://andresrios:${password}@cluster0.jid3p.mongodb.net/myFirstDatabase?
retryWrites=true&w=majority`;

export { MONGO_URL };
