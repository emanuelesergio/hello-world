module.exports = app => {
  const piloti = require("../controller/pilot.controller.js");

  // Create a new pilota
  app.post("/piloti", piloti.create);

  // Retrieve all Pilots
  app.get("/piloti", piloti.findAll);

  // Retrieve a single Pilota with customerId
  app.get("/piloti/:pilotaId", piloti.findOne);

  // Update a Pilota with customerId
  app.put("/piloti/:pilotaId", piloti.update);

  // Delete a Pilota with customerId
  app.delete("/piloti/:pilotaId", piloti.delete);

  // Create a new Pilota
  app.delete("/piloti", piloti.deleteAll);
  app.use(bodyParser.json())

  app.post("/hook", (req, res) => {
    console.log(req.body) 
    res.status(200).end() 
  })
};
