import Permission from "../models/Permission.js";
import { GraphQLError } from 'graphql';

const fetchAllPermissions = async () => {
	try {
		const permissions = Permission.find({});
		return permissions;
	} catch (error) {
		console.log(error.message);
	}
}

const fetchPermission = async (parent, { id }, { req, res }) => {
	try {
		const permission = Permission.findById({ id });
		return permission;
	} catch (error) {
		console.log(error.message);
	}
}

const createPermission = async (parent, { input: { name } }, { req, res }) => {
	try {
		// If permission to be addded already exists.
		const existingPermission = await Permission.findOne({ name });

		if(existingPermission) {
			return new GraphQLError('Duplicate permission exists', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}

		const newPermission = new Permission({
			name
		});

		await newPermission.save();

		return newPermission 

	} catch (error) {
		return new GraphQLError('Error in request params.', {
			extensions: {
				code: 'FORBIDDEN',
			}
		});
	}
}

const updatePermission = async (parent, { id, input: { name } }, { req, res }) => {
	try {
		const permissionToUpdate = await Permission.findById({ _id: id });

		if(!permissionToUpdate) {
			return new GraphQLError('Permission not found.', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}

		if(name !== permissionToUpdate.name) {
			const existingPermission = await Permission.findOne({ name });

			if(existingPermission) {
				return new GraphQLError('Permission with the updated name already exists', {
					extensions: {
						code: 'FORBIDDEN',
					}
				});
			}
		}

		permissionToUpdate.name = name;

		await permissionToUpdate.save();

		return permissionToUpdate;

	} catch (error) {
		return new GraphQLError('An error occurred while updating the permission', {
			extensions: {
				code: 'FORBIDDEN',
			}
		});
	}
}

const deletePermission = async (parent, { id }, { req, res }) => {
	try {
		const permissionToDelete = await Permission.findById({ _id: id });

		if(!permissionToDelete) {
			return new GraphQLError('Permission not found.', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}

	} catch (error) {
		console.log(error.message);
	}
}

export {
	fetchAllPermissions,
	fetchPermission,
	createPermission,
	updatePermission,
	deletePermission
}