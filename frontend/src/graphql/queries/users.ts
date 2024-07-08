import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query {
        users {
            id
            email
            name
            age
        }
    }
`;