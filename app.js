const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.status(200).render("index", {
    navigation_active: "index",
  });
});

app.get("/about", async (req, res) => {
  res.status(200).render("about", {
    navigation_active: "about",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
