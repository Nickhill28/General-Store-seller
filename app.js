const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const productRouter = require("./routes/product.router");
const sequelize = require("./util/database");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/product", productRouter);
sequelize
  .sync()
  .then((res) => {
    app.listen(4000, () => {
      console.log("server invoked at : http://localhost:4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
