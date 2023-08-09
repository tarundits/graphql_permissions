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
    permissions: mongoose.Schema.Types.Mixed
});

const Role = mongoose.model('Role', roleSchema);

export default Role;