const session = require("express-session");
const express = require("express");
const router = express.Router();

// Custom modules
const basicAuth = require("../lib").basicAuth;
const logit = require("../lib").log;
const db = require("../db");

// Read connection settings from config file:
const conf = require("../config.json");

// Set session options
router.use(
  session({
    secret: "m3ga-2ecr3t-phra2e!",
    resave: false,
    saveUninitialized: true,
    // , cookie: { secure: true }
    cookie: { maxAge: 3600000 }
  })
);

// GET home page
router.get("/", (req, res, next) => {
  require("../hand").GET(res, "index", () => db.any("select * from salabahter order by id asc"));
});

// GET/POST admin page
// -----------------------------------------------------------------------
//
// Veify if session is valid
const auth = (req, res, next) => {
  if (!req.session.authStatus || "loggedOut" === req.session.authStatus) {
    req.session.authStatus = "loggingIn";
    //
    // cause Express to issue 401 status so browser asks for authentication
    req.user = false;
    req.remoteUser = false;
    if (req.headers && req.headers.authorization) {
      delete req.headers.authorization;
    }
  }
  next();
};
//
// Perform basic authentication
const credential = basicAuth(function(user, pass, callback) {
  callback(null, user === conf.auth.name && pass === conf.auth.pass);
}, "***** Restricted Area *****");
//
// Set session access granted
const granted = (req, res, next) => {
  req.session.authStatus = "loggedIn";
  next();
};
//
// Recquest credential for restricted area
router.route("/admin").all(auth, credential, granted);
//
// ***** Restricted Area *****
router
  .route("/admin")
  .get((req, res) => {
    logit.info("(routes) ACCESS GRANTED: ", req.ip);
    require("../hand").GET(res, "admin");
  })
  .post((req, res) => {
    let pitanje = req.body.pitanje;
    let odgovori = req.body.odgovori.replace(/[^ \-;()=a-zA-Z0-9čćđšžČĆĐŠŽ]/g, "").split(";");

    odgovori = odgovori.map(str => str.trim());
    // odgovori = odgovori.map(str => str.toLowerCase());
    //for (let i = 0, l = odgovori.length; i < l; i++) odgovori[i] = odgovori[i].trim();

    require("../hand").GET(res, "admin", () =>
      db.one(
        "INSERT INTO Salabahter(pitanje, odgovori) VALUES($1, $2) RETURNING id",
        [pitanje, odgovori],
        Salabahter => Salabahter.id
      )
    );
  });
// ***** Restricted Area *****
// -----------------------------------------------------------------------

// Remove session granted access
router.get("/logout", function(req, res) {
  delete req.session.authStatus;
  // res.send(
  //   [
  //     "You are now logged out.",
  //     "&lt;br/>",
  //     '<a href="./admin">Return to the secure page. You will have to log in again.</a>'
  //   ].join("")
  // );
  res.set("WWW-Authenticate", 'Basic realm="restricted"');
  res.status(401).redirect("/");
});

module.exports = router;
