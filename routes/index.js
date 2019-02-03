const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// GET home page
router.get("/", function(req, res, next) {
  require("../hand").GET(res, "index", () => db.any("select * from salabahter"), {
    view_name: "Svi proizvodi"
  });
});

module.exports = router;
