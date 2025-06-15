import app from "./app.js";
import { connectDB } from "./db/conn.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
