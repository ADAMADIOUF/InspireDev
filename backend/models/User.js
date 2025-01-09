import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, unique: true }, // Google login support
    image: { type: String },
    role: { type: String, default: 'user' },
    avatar: String,
    isVerified: { type: Boolean, default: false }, // for Google login
  },
  {
    timestamps: true,
  }
)

// Encrypt the password before saving the user to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
