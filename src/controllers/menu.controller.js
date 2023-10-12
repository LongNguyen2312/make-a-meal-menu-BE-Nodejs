// Gọi sang model
const Menu = require("../models/menu.model");

exports.menu = async (req, res) => {
  const data = await Menu.get_all();
  res.send(data);
};

exports.add = async (req, res) => {
  const data = await Menu.add(req.body);
  res.send(data);
};

exports.update = async (req, res) => {
  const data = await Menu.update(req.params.id, req.body);
  res.send(data);
};
