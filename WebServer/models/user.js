const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 64,
      trim: true, // trims the excess spaces or useless characters
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    addr: {
      type: String,
    },
    phone: {
      type: String,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
); // notes the timestamps

userSchema
  .virtual("password") // converts password to hash
  .set(function (password) {
    this._password = password; //_ for private variable
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    //authenticate password by user
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    //generate password hash
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
