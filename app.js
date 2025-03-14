import express from "express";

import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription API");
});

app.listen(PORT, () => {
  console.log(`Subscription API is running on http://localhost:${PORT}`);
});

export default app;
