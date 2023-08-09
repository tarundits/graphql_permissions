import { gql } from "graphql-tag";

export const PermissionSchema = `
	type Permission {
		_id: String,
        name: String
	}

	type Null {
		data: String
	}

	type Query {
		getAllPermissions: [Permission],
		getPermission(id: String): Permission
	}

	input PermissionInput {
		name: String
	}

	input UpdatePermissionInput {
		name: String
	}

	type Mutation {
		createPermission(input: PermissionInput): Permission,
		updatePermission(id: String, input: UpdatePermissionInput): Permission,
		deletePermission(id: String): Null
	}
`;

export const PermissionTypeDefs = gql`${PermissionSchema}`;