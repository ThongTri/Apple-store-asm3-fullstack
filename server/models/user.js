const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, "Please create your username"],
    //   unique: [true, "Your username has been used"],
    //   trim: true,
    // },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Someone used your email"],
      trim: true,
      lowsercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      trim: true,
      minlength: [8, "Your password must be at least 8 characters long"],
      select: false,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, "Please confirm your password"],
    //   validate: {
    //     //this word for create() and save() method;
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: "Password are not the same",
    //   },
    // },
    fullName: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number"],
      unique: [true, "Someone used your phone number"],
      trim: true,
    },
    role: { type: String, enum: ["admin", "user", "saler"], default: "user" },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  //Run when password modify
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (loginPass, dbPass) {
  return await bcrypt.compare(loginPass, dbPass);
};
module.exports = mongoose.model("User", userSchema);
