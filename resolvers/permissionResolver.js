import { 
	fetchAllPermissions,
	fetchPermission,
	createPermission,
	updatePermission,
	deletePermission 
} from "../controllers/permissionController.js"

const permissionResolver = {
	Query: {
		getAllPermissions: fetchAllPermissions,
		getPermission: async (parent, args, context) => {
		    return await fetchPermission(parent, args, context);
		}
	},

	Mutation: {
		createPermission: async (parent, args, context) => {
		    return await createPermission(parent, args, context);
		},
		updatePermission: async (parent, args, context) => {
		    return await updatePermission(parent, args, context);
		},
		deletePermission: async (parent, args, context) => {
		    return await deletePermission(parent, args, context);
		},
	}
}

export default permissionResolver;