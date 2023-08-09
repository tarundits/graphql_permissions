import Role from '../models/Role.js';
import Permission from '../models/Permission.js';
import { GraphQLError } from 'graphql';

const fetchAllRoles = async () => {
	try {
		const roles = Role.find({});
		return roles;
	} catch (error) {
		return new GraphQLError('No roles exists.', {
			extensions: {
				code: 'FORBIDDEN',
			}
		});
	}
}

const fetchRole = async (parent, { id }, { req, res }) => {
	try {
		const role = Role.findById({ _id: id });
		return role;
	} catch (error) {
		return new GraphQLError('Role with this id does not exists.', {
			extensions: {
				code: 'FORBIDDEN',
			}
		});
	}
}

const createRole1 = async (parent, { input: { name, permissions } }, { req, res }) => {

	console.log(name);
	console.log(permissions[0].name);

	try {

		const all_permission = permissions[0].name.split(',');
		const permissionNames = await Permission.find({ name: { $in: all_permission } });
		console.log(permissionNames);

		// If role to be addded already exists.
		/*
		const existingRole = await Role.findOne({ name });

		if(existingRole) {
			return new GraphQLError('Duplicate role exists', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}
		*/

		const all_p_names = permissionNames.map(permissionName => permissionName._id);

		console.log(all_p_names);

		const newRole= new Role({
			name,
			permissions: all_p_names,
		});

		console.log(newRole);

		await newRole.save();

		return newRole 

	} catch (error) {
		return new GraphQLError('Error in request params.', {
			extensions: {
				code: 'FORBIDDEN',
			}
		});
	}
}
  
const createRole = async (parent, { input: { name, permissions } }, { req, res }) => {
	try {
	  const permissionNames = permissions[0].name.split(',').map(permissionName => permissionName.trim());
	  console.log('11', permissionNames);
  
	  const existingPermissions = await Permission.find({ name: { $in: permissionNames } });
	  console.log('22', existingPermissions);
  
	  const permissionIds = existingPermissions.map(permission => permission._id);
	  console.log('33', permissionIds);
  
	  const newRole = new Role({
		name,
		permissions: permissionIds,
	  });

	  console.log('44', newRole);
  
	  await newRole.save();
  
	  return newRole;
	} catch (error) {
	  console.error('Error creating role:', error);
	  throw new Error('An error occurred while creating the role');
	}
};
   
  

const updateRole = async (parent, { id, input: { name } }, { req, res }) => {
	try {
		const roleToUpdate = await Role.findById({ _id: id });

		if(!roleToUpdate) {
			return new GraphQLError('Role not found.', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}

		if(name !== roleToUpdate.name) {
			const existingRole = await Role.findOne({ name });

			if(existingRole) {
				return new GraphQLError('Role with the updated name already exists', {
					extensions: {
						code: 'FORBIDDEN',
					}
				});
			}
		}

		roleToUpdate.name = name;

		await roleToUpdate.save();

		return roleToUpdate;

	} catch (error) {
		return new GraphQLError('An error occurred while updating the role', {
			extensions: {
				code: 'FORBIDDEN',
			}
		});
	}
}

const deleteRole = async (parent, { id }, { req, res }) => {
	try {
		const roleToDelete = await Role.findById({ _id: id });

		if(!roleToDelete) {
			return new GraphQLError('Role not found.', {
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
	fetchAllRoles,
	fetchRole,
	createRole,
	updateRole,
	deleteRole
}