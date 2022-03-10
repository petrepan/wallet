const express = require("express");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
// const productRoutes = require("./routes/productRoutes");
const dotenv = require("dotenv");
const db = require("./config/db");

// configure dotenv for environment variable
dotenv.config({ path: ".env" });
const app = express();

db();

// Body Parser
app.use(express.json());

// Mounting
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/transaction", transactionRoutes);

// Start our server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});