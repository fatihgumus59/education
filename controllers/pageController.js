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

exports.getRegisterPage = async (req, res) => {
  res.status(200).render("register", {
    navigation_active: "register",
  });
};

exports.getLoginPage = async (req, res) => {
  res.status(200).render("login", {
    navigation_active: "login",
  });
};