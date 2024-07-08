// PostsList.tsx

import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_POST } from "../../graphql/mutations/posts";
import { GET_POSTS } from "../../graphql/queries/posts";
import { Post } from "../../graphql/types/posts";

import "./style.css";

interface AddPostForm {
    title: string;
    content?: string;
    age?: number;
    published?: boolean;
    authorId: number;
}

const PostsList: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(GET_POSTS);
    const [createPost] = useMutation(CREATE_POST);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<AddPostForm>({
        title: "",
        content: "",
        published: false,
        authorId: 0,
    });

    // const [updateForm, setUpdateForm] = useState(false);
    // const [idPost, setIdPost] = useState(0);

    const handleAddPost = async () => {
        try {
            await createPost({
                variables: {
                    createPostInput: {
                        title: formData.title,
                        content: formData.content,
                        published: formData.published,
                        authorId: formData.authorId,
                    },
                },
            });
            setFormData({
                title: "",
                content: "",
                published: false,
                authorId: 0,
            });
            refetch();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'utilisateur:", error);
        }
    };

    // const handleDeletePost = async (id: number) => {
    //     try {
    //         await removePost({
    //             variables: {
    //                 id,
    //             },
    //         });
    //         refetch();
    //     } catch (error) {
    //         console.error(
    //             "Erreur lors de la suppression d'utilisateur:",
    //             error
    //         );
    //     }
    // };

    // const handleUpdatePost = async () => {
    //     try {
    //         // @ts-expect-error -ignore
    //         const age = formData.age ? parseInt(formData.age) : undefined;

    //         await updatePost({
    //             variables: {
    //                 updatePostInput: {
    //                     id: idPost,
    //                     email: formData.email,
    //                     name: formData.name,
    //                     age,
    //                 },
    //             },
    //         });
    //         setFormData({ email: "", name: "", age: undefined });
    //         refetch();
    //     } catch (error) {
    //         console.error("Erreur lors de l'ajout d'utilisateur:", error);
    //     }
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // const toggleUpdateForm = (id: number) => {
    //     setShowForm(!showForm);
    //     setUpdateForm(!updateForm);
    //     setIdPost(id);
    // };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h1>Liste de posts</h1>
            <div className="btn btn-add" onClick={toggleForm}>
                {showForm ? "Fermer le formulaire" : "Ajouter un post"}
            </div>
            {showForm && (
                <div className="post-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="content"
                        placeholder="Content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Âge"
                        value={formData.age || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />{" "}
                    Published
                    <input
                        type="number"
                        name="authorId"
                        placeholder="Author ID"
                        value={formData.authorId}
                        onChange={handleChange}
                    />
                    <div className="btn btn-submit" onClick={handleAddPost}>
                        Ajouter
                    </div>
                </div>
            )}

            <div className="post-list">
                {data.posts.map((post: Post) => (
                    <div className="post" key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Content: {post.content}</p>
                        <p>Author ID: {post.author.id}</p>
                        <p>Author Name: {post.author.name}</p>
                        <p>Author Email: {post.author.email}</p>
                        {post.published && <p>Post publié</p>}
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostsList;
