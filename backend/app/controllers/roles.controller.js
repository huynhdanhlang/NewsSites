const db = require("../models/index");
const Roles = db.role;

exports.getAllRoles = async (req, res) => {
    try {
      const roles = await Roles.find()
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };