// export default PostsList;
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
    CREATE_POST,
    REMOVE_POST,
    UPDATE_POST,
} from "../../graphql/mutations/posts";
import { GET_POSTS } from "../../graphql/queries/posts";
import { Post } from "../../graphql/types/posts";

import "./style.css";

interface AddPostForm {
    title: string;
    content: string;
    published?: boolean;
    authorId: number;
}

const PostsList: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(GET_POSTS);
    const [createPost] = useMutation(CREATE_POST);
    const [updatePost] = useMutation(UPDATE_POST);
    const [removePost] = useMutation(REMOVE_POST);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<AddPostForm>({
        title: "",
        content: "",
        published: false,
        authorId: 0,
    });

    const [updateForm, setUpdateForm] = useState(false);
    const [idPost, setIdPost] = useState(0);

    const handleAddPost = async () => {
        formData.authorId = 16;
        try {
            const {
                data: { createPost: newPost },
            } = await createPost({
                variables: {
                    createPostInput: {
                        title: formData.title,
                        content: formData.content,
                        published: formData.published,
                        authorId: formData.authorId,
                    },
                },
            });
            console.log("New Post:", newPost);

            setFormData({
                title: "",
                content: "",
                published: false,
                authorId: 0,
            });
            refetch();
        } catch (error) {
            console.error("Erreur lors de l'ajout du post:", error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await removePost({
                variables: {
                    id,
                },
            });
            refetch();
        } catch (error) {
            console.error(
                "Erreur lors de la suppression d'utilisateur:",
                error
            );
        }
    };

    const handleUpdateUser = async () => {
        try {
            await updatePost({
                variables: {
                    updatePostInput: {
                        id: idPost,
                        title: formData.title,
                        content: formData.content,
                        published: formData.published,
                        authorId: 16,
                    },
                },
            });
            setFormData({
                title: "",
                content: "",
                published: undefined,
                authorId: 0,
            });
            refetch();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'utilisateur:", error);
        }
    };

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

    const toggleUpdateForm = (id: number) => {
        setShowForm(!showForm);
        setUpdateForm(!updateForm);
        setIdPost(id);
    };

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
                    {updateForm ? (
                        <div
                            className="btn btn-submit"
                            onClick={handleUpdateUser}
                        >
                            Modifier
                        </div>
                    ) : (
                        <div className="btn btn-submit" onClick={handleAddPost}>
                            Ajouter
                        </div>
                    )}
                </div>
            )}

            <div className="post-list">
                {data.posts.map((post: Post) => (
                    <div className="post" key={post.id}>
                        <p>Title: {post.title}</p>
                        <p>Content: {post.content}</p>
                        {post.author ? (
                            <>
                                <p>Author ID: {post.author.id}</p>
                                <p>Author Name: {post.author.name}</p>
                                <p>Author Email: {post.author.email}</p>
                            </>
                        ) : (
                            <p>No Author</p>
                        )}
                        {post.published && <p>Post publié</p>}
                        <hr />

                        <div
                            className="btn btn-update"
                            onClick={() => toggleUpdateForm(post.id)}
                        >
                            Modifier
                        </div>
                        <div
                            className="btn btn-delete"
                            onClick={() => handleDeleteUser(post.id)}
                        >
                            Supprimer
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostsList;
