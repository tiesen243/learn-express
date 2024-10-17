import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { createContext } from "./middleware/context";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
import { appRouter } from "./root";

const app = express();
const DOMAIN = process.env.DOMAIN || "localhost";
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(createContext);
app.use(errorHandler);
app.use(logger);

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://${DOMAIN}:${PORT}`);
});
