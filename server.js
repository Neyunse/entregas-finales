import express from "express";
import cors from "cors";
const app = express();
import settings from "./config/settings.json" assert { type: "json" };
const PORT = process.env.PORT ||settings.port;
import { endpoints } from "./api/index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));


app.use("/api", endpoints)

// app.use((req, res) => {
//       res.status(404).json({
//             error: {
//                   code: 404,
//                   message: `${req.originalUrl} does not exist.`
//             }
//       })
// })



app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
});
