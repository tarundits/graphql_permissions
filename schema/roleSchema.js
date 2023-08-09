import { gql } from "graphql-tag";

export const roleSchema = `
	type Permission {
		_id: String,
        name: String
	}

	type RolePermission {
		name: String
	}

	type Role {
		_id: String,
		name: String,
		permissions: [Permission]
	}

	type Null {
		data: String
	}

	type Query {
		getAllRoles: [Role],
		getRole(id: String): Role
	}

	input PermissionInput {
		name: String
	}

	input RoleInput {
		name: String,
		permissions: [PermissionInput]
	}

	input UpdateRoleInput {
		name: String
	}

	type Mutation {
		createRole(input: RoleInput): Role,
		updateRole(id: String, input: UpdateRoleInput): Role,
		deleteRole(id: String): Null
	}
`;

export const RoleTypeDefs = gql`${roleSchema}`;