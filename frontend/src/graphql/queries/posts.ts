import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query {
        posts {
            id
            title
            content
            published
            author {
                id
                email
                name
            }
        }
    }
`;
