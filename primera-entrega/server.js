const express = require("express");
const cors = require("cors");
const app = express();
const { port } = require("./config/settings")
const PORT = process.env.PORT || port;
const { endpoints } = require("./api");

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
