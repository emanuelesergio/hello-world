const Pilota = require("../model/pilot.model.js");
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const pilota = new Pilota({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Pilota.create(pilota, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};