import express from "express";
import postRoutes from "./controllers/postRoutes.js";
import accountRoutes from "./controllers/accountRoutes.js";

import cors from "cors"; // Import the cors middleware

const app = express();
const PORT = 8080;

// Middleware setup
app.use(cors()); // Apply cors middleware globally
app.use(express.json()); // JSON parsing middleware

// API routes mounting
app.use("/api/posts/", postRoutes);
app.use("/api/user", accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
