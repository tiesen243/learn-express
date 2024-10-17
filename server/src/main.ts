import express from "express";

import { appRouter } from "./root";
import { createContext } from "./middleware/context";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";

const app = express();
const DOMAIN = process.env.DOMAIN || "localhost";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(createContext);
app.use(errorHandler);
app.use(logger);

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://${DOMAIN}:${PORT}`);
});
