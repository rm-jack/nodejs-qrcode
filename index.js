const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qrCode = require("qrcode");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const url = req?.body?.url;
  if (url.length === 0) res.send("Empty Data");
  qrCode.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");
    res.render("scan", { src });
  });
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
