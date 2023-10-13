const express = require("express");
const app = express();

// Dùng để lấy body khi post
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gọi sang router
require("./src/routes/menu.router")(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("server start");
});
