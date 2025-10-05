import dotenv from "dotenv";
import { connectDB } from "./dB/dB.connect.js";
import server from "./server.js";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT ? Number(process.env.PORT) : 1000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`The server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); 
  });
