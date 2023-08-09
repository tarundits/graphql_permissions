import { 
	fetchAllRoles,
	fetchRole,
	createRole,
	updateRole,
	deleteRole
} from "../controllers/roleController.js";

const roleResolver = {
	Query: {
		getAllRoles: fetchAllRoles,
		getRole: async (parent, args, context) => {
		    return await fetchRole(parent, args, context);
		}
	},

	Mutation: {
		createRole: async (parent, args, context) => {
		    return await createRole(parent, args, context);
		},
		updateRole: async (parent, args, context) => {
		    return await updateRole(parent, args, context);
		},
		deleteRole: async (parent, args, context) => {
		    return await deleteRole(parent, args, context);
		},
	}
}

export default roleResolver;