import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type:      String,
      required:  [true, "First name is required"],
      trim:      true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type:      String,
      required:  [true, "Last name is required"],
      trim:      true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type:      String,
      required:  [true, "Email is required"],
      unique:    true,
      lowercase: true,
      trim:      true,
      validate:  [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type:      String,
      minlength: [8, "Password must be at least 8 characters"],
      select:    false,
    },
    googleId: {
      type:   String,
      sparse: true,
      unique: true,
    },
    avatar: {
      type:    String,
      default: null,
    },
    authProvider: {
      type:    String,
      enum:    ["local", "google"],
      default: "local",
    },
    isEmailVerified: {
      type:    Boolean,
      default: false,
    },
    refreshTokens: [
      {
        token:     { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
      },
    ],
    lastLogin: {
      type:    Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ── Hash password before saving ───────────────────────────────
// bcryptjs v3.x removed the callback — use async/await only
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  const salt    = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// ── Compare password ──────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ── Virtual: full name ────────────────────────────────────────
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model("User", userSchema);