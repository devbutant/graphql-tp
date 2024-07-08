// App.tsx

import { ApolloProvider } from "@apollo/react-hooks";
import PostsList from "./Components/posts/PostsList";
import UsersList from "./Components/users/UsersList"; // Assurez-vous d'avoir créé ce composant
import client from "./graphql/apollo.client";

function App() {
    return (
        <ApolloProvider client={client}>
            <UsersList />
            <PostsList />
        </ApolloProvider>
    );
}

export default App;
