# NestJS GraphQL API Template

This repository serves as a starting point for building GraphQL APIs using NestJS, a progressive Node.js framework.
To use this template, follow these steps:

### 1. Create a New Repository:

Click on the `Use this template` button on this repository's GitHub page to create a new repository based on this template.

### 2. Clone the Repository:

Clone the repository you just created to your local machine using Git:

```bash
git clone https://github.com/your-name/your-new-repository.git
```

### 3. Install Dependencies

Use the following command to install all necessary project dependencies:

```bash
pnpm i
```

### 4. Configure Environment Variables

Copy the example .env file to create your own .env file:

```bash
cp .env.example .env
```

Make sure to edit the .env file to include the correct values for your environment.

### 5. Migrate the Database

Use Prisma to reset and apply database migrations:

```bash
pnpx prisma migrate reset
```

### 6. Start the Development Server

Run the development server with the following command:

```bash
pnpm run dev
```

The development server should now be running. You can access the application at _http://localhost:3001_.
