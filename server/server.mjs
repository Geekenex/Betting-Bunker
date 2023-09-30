import express from "express";
import cors from "cors";

import router from "./controller.mjs";
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use(router)
// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});