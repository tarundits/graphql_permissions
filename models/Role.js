import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const roleSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: () => nanoid(), 
	},
	name: { 
		type: String, 
		required: true, 
		unique: true 
	},
    permissions: [
		{ 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Permission' 
		}
	],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;