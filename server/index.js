const express = require("express");

const app = express();

const cors = require("cors");
const userRouter = require("./routes/user");
const collectionRouter = require("./routes/collection")

app.use(cors());

app.use(express.json());


app.use("/user",userRouter);

app.use("/collection",collectionRouter);

app.listen(3001, () => {
  console.log(`Connection Established on port ${3001}`);
});
