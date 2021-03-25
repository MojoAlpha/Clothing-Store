const { validationResult } = require("express-validator");

exports.errHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
      success: false,
    });
  }

  next();
};
