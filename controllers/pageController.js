exports.getIndexPage = async (req, res) => {
  res.status(200).render("index", {
    navigation_active: "index",
  });
};

exports.getAboutPage = async (req, res) => {
  res.status(200).render("about", {
    navigation_active: "about",
  });
};
