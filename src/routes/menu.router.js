module.exports = (router) => {
  // Gọi sang controller
  const homeController = require("../controllers/menu.controller");

  router.get("/menu", homeController.menu);

  router.post("/menu/add", homeController.add);

  router.patch("/menu/update/:id", homeController.update);
};
