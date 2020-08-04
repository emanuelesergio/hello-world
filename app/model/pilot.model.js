const sql = require("./db.js");

// constructor
const Pilota = function(pilota) {
  this.email = pilota.email;
  this.name = pilota.name;
  this.active = pilota.active;
};

Pilota.create = (newPilota, result) => {
  sql.query("INSERT INTO piloti SET ?", newPilota, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pilota: ", { id: res.insertId, ...newPilota });
    result(null, { id: res.insertId, ...newPilota });
  });
};

Pilota.findById = (pilotaId, result) => {
  sql.query(`SELECT * FROM piloti WHERE id = ${pilotaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pilota: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Pilota with the id
    result({ kind: "not_found" }, null);
  });
};

Pilota.getAll = result => {
  sql.query("SELECT * FROM piloti", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("piloti: ", res);
    result(null, res);
  });
};

Pilota.updateById = (id, pilota, result) => {
  sql.query(
    "UPDATE piloti SET email = ?, name = ?, active = ? WHERE id = ?",
    [pilota.email, pilota.name, pilota.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pilota with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pilota: ", { id: id, ...pilota });
      result(null, { id: id, ...pilota });
    }
  );
};

Pilota.remove = (id, result) => {
  sql.query("DELETE FROM piloti WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Piloti with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pilota with id: ", id);
    result(null, res);
  });
};

Pilota.removeAll = result => {
  sql.query("DELETE FROM piloti", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} piloti`);
    result(null, res);
  });
};

module.exports = Pilota;