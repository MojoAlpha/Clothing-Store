const User = require("../models/user");
const Order = require("../models/order");

exports.getUserFromParam = (req, res, next, id) => {
  User.findById(id).then((user) => {
    if (!user)
      return res.status(400).json({
        error: "User not found!!",
        success: false,
      });

    // saving user information inside profile field of request
    req.profile = user;
    next();
  });
};

exports.getUserById = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.role = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  if (req.profile._id !== req.root._id)
    return res
      .status(401)
      .json({ error: "You are not authorised!!", success: false });

  User.findByIdAndUpdate(req.profile._id).then((user) => {
    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.addr !== undefined) user.addr = req.body.addr;
    if (req.body.phone !== undefined) user.phone = req.body.phone;

    user.save().then(
      (user) => {
        return res.status(200).json({ msg: "User updated!!", success: true });
      },
      (err) => {
        return res.status(502).json({ error: err, success: false });
      }
    );
  });
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order In this Account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //storing this in db
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }, //send me the updated object
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save Purchase List!!",
        });
      }
      next();
    }
  );
};
