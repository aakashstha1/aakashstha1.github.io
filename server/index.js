const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require("./db/db_conn");

require("dotenv").config();

const portfolioRoute = require("./routes/portfolioRoute");

app.use("/api/portfolio", portfolioRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
