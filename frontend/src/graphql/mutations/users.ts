import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            id
            email
            name
            age
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!) {
        updateUser(updateUserInput: $updateUserInput) {
            id
            email
            name
            age
        }
    }
`;

export const REMOVE_USER = gql`
    mutation RemoveUser($id: Int!) {
        removeUser(id: $id) {
            id
        }
    }
`;
