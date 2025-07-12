const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Avoid rehashing on update
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create and export model
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
