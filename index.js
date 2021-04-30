const express = require("express");
const { PORT } = require("./config/constants");
const corsMiddleware = require("cors");
const teamsRouter = require("./routers/teams");

const app = express();

app.use(corsMiddleware());

app.get("/", (req, res) => {
  res.send("Hi from Express");
});

app.use("/teams", teamsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
