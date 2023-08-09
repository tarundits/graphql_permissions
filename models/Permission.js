import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const permissionSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: () => nanoid(), 
	},
	name: { 
		type: String, 
		required: true, 
		unique: true 
	},
});
  
const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;