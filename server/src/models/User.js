const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPass = await bcrypt.hash(this.password, 10);
    return (this.password = hashedPass);
  } catch (error) {
    return next(error);
  }
});

UserSchema.pre("updateOne", async function (next) {
  try {
    if (this._update.password) {
      const hashedPass = await bcrypt.hash(this._update.password, 10);
      this._update.password = hashedPass;
      return next();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.verifyPassword = async function (plain_password) {
  return bcrypt.compare(plain_password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
