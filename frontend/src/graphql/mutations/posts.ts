import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput) {
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

export const UPDATE_POST = gql`
    mutation UpdatePost($updatePostInput: UpdatePostInput!) {
        updatePost(updatePostInput: $updatePostInput) {
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

export const REMOVE_POST = gql`
    mutation RemovePost($id: Int!) {
        removePost(id: $id) {
            id
        }
    }
`;
