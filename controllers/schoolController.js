const calculateDistance = require("../utils/calculateDistance");
const db = require("../dbinit");

module.exports = {
  addschools: (req, res) => {
    try {
      const { name, address, latitude, longitude } = req.body;

      if (
        !name ||
        !address ||
        typeof latitude !== "number" ||
        typeof longitude !== "number"
      ) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const query =
        "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";
      db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
          throw err;
        }
      });
      res.status(201).json({ message: "School added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message || "error" });
    }
  },

  getschools: (req, res) => {
    try {
      const { latitude, longitude } = req.query;

      if (typeof latitude === "undefined" || typeof longitude === "undefined") {
        return res
          .status(400)
          .json({ error: "latitude and longitude are required." });
      }

      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);

      if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: "Invalid coordinates." });
      }

      const query = "SELECT * FROM schools";
      db.query(query, (err, results) => {
        if (err) {
          throw err;
        }

        const sortedschools = results
          .map((school) => ({
            ...school,
            distance: calculateDistance(
              userLat,
              userLon,
              school.latitude,
              school.longitude
            ),
          }))
          .sort((a, b) => a.distance - b.distance);

        res.json(sortedschools);
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "error" });
    }
  },
};
