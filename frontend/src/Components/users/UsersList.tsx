// UsersList.tsx

import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
    CREATE_USER,
    REMOVE_USER,
    UPDATE_USER,
} from "../../graphql/mutations/users";
import { GET_USERS } from "../../graphql/queries/users";
import { User } from "../../graphql/types/users";
import "./style.css";

interface AddUserForm {
    email: string;
    name: string;
    age?: number;
}

const UsersList: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [createUser] = useMutation(CREATE_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [removeUser] = useMutation(REMOVE_USER);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<AddUserForm>({
        email: "",
        name: "",
        age: undefined,
    });

    const [updateForm, setUpdateForm] = useState(false);
    const [idUser, setIdUser] = useState(0);

    const handleAddUser = async () => {
        try {
            // @ts-expect-error -ignore
            const age = formData.age ? parseInt(formData.age) : undefined;

            await createUser({
                variables: {
                    createUserInput: {
                        email: formData.email,
                        name: formData.name,
                        age,
                    },
                },
            });
            setFormData({ email: "", name: "", age: undefined });
            refetch();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'utilisateur:", error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await removeUser({
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
            // @ts-expect-error -ignore
            const age = formData.age ? parseInt(formData.age) : undefined;

            await updateUser({
                variables: {
                    updateUserInput: {
                        id: idUser,
                        email: formData.email,
                        name: formData.name,
                        age,
                    },
                },
            });
            setFormData({ email: "", name: "", age: undefined });
            refetch();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'utilisateur:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const toggleUpdateForm = (id: number) => {
        setShowForm(!showForm);
        setUpdateForm(!updateForm);
        setIdUser(id);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <h1>Liste d'utilisateurs</h1>
            <div className="btn btn-add" onClick={toggleForm}>
                {showForm ? "Fermer le formulaire" : "Ajouter un utilisateur"}
            </div>
            {showForm && (
                <div className="user-form">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Âge"
                        value={formData.age || ""}
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
                        <div className="btn btn-submit" onClick={handleAddUser}>
                            Ajouter
                        </div>
                    )}
                </div>
            )}
            <div className="user-list">
                {data.users.map((user: User) => (
                    <div className="user" key={user.id}>
                        <p>Email: {user.email}</p>
                        <p>Name: {user.name}</p>
                        {user.age && <p>Age: {user.age}</p>}
                        <hr />

                        <div
                            className="btn btn-update"
                            onClick={() => toggleUpdateForm(user.id)}
                        >
                            Modifier
                        </div>
                        <div
                            className="btn btn-delete"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Supprimer
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UsersList;
