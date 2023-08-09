# Architecture
Node and GraphQL
## Getting started

The command below will install all node_modules, link required packages and start the application.

`npm install && npm run dev`

## Postman Query

### Fetch All Permissions

```graphql
query GetAllPermissions {
  getAllPermissions {
    _id
    name
  }
}
```

### Create Permission

```graphql
mutation createPermission($input: PermissionInput) {
  createPermission(input: $input) {
    _id
    name
  }
}
```

```json
{
  "input": {
    "name": "update_user"
  }
}
```

### Update Permission

```graphql
mutation updatePermission($id: String, $input: UpdatePermissionInput) {
  updatePermission(id: $id, input: $input) {
    _id
    name
  }
}
```

```json
{
  "id": "HQTPTRLJ9VlGj1tILxHlv",
  "input": {
    "name": "create_user"
  }
}
```

### Delete Permission

```graphql
mutation deletePermission($id: String) {
  deletePermission(id: $id) {
    data
  }
}
```

```json
{
  "id": "6QJM15hg7Wd7vni4bol4"
}
```