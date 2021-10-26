const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const logger = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
    morgan(process.env.ENV === "PROD" ? "combined" : "dev", {
        stream: logger.stream,
    })
);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}...`);
});
