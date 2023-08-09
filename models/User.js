import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const userSchema = new mongoose.Schema(
  	{
		_id: {
			type: String,
			default: () => nanoid(), 
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [8, 'Password must be more than 8 characters'],
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			validate: {
				validator: function (val) {
				return val === this.password;
				},
				message: 'Passwords do not match',
			},
		},
		photo: {
			type: String,
			default: 'default.png',
		},
		roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
		verified: {
			type: Boolean,
			default: true,
			select: false,
		},
  	},
  	{ 
		timestamps: true, 
		toJSON: { virtuals: true }, 
		toObject: { virtuals: true } 
	}
);

userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
  // Check if the password has been modified
  if (!this.isModified('password')) return next();

  // Hash password with strength of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove the password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

const userModel = mongoose.model('User', userSchema);
export default userModel;
