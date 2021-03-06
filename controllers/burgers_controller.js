// Dependencies
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// GET route
router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burgers: data,
    };
    res.render("index", hbsObject);
  });
});

// POST route
router.post("/api/burgers", function (req, res) {
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function (result) {
      // Return the id of the new burger
      res.json({ id: result.insertId });
    }
  );
});

// PUT route
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed display a 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// DELETE route
router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed display a 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes to server.js file
module.exports = router;
