const Admin = require("../models/adminModels");

const getAdmin = async (req, res) => {
  const getDataAdmin = await Admin.findAll();

  try {
    const success = getDataAdmin
      ? res.status(200).json({ data: getDataAdmin })
      : getDataAdmin === null
      ? res.sendStatus(400)
      : res.status(500).json({ message: "Internal server error" });

    return success;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

module.exports = { getAdmin };
