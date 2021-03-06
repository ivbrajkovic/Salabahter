const logit = require("../lib").log;

// Generic GET handler
module.exports = {
  GET: (res, view, handler, args) => {
    if (handler !== undefined) {
      handler()
        .then(data => {
          logit.warn_2("(hand) DATA:", data);
          logit.warn_2("(hand) DATA LENGHT:", data.length);
          res.render(view, {
            success: true,
            db_data: data,
            args: args
          });
        })
        .catch(error => {
          logit.error("(hand) ERROR:", error);
          res.json({
            success: false,
            error: error.message || error
          });
        });
    } else {
      logit.warn_2("(hand) DATA:", view);
      res.render(view);
    }
  }
};
