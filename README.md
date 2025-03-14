# Blog REST API

This repository contains the RESTful API for the RecipeConnect project, providing endpoints for managing recipes, comments, and user authentication.

## Features

- **CRUD Operations**: Create, read, update, and delete recipes and comments.
- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Role-Based Access**: Differentiate between regular users and admin users for access control.
- **Data Validation**: Ensure data integrity with robust validation mechanisms.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: SQL database for data storage.
- **PrismaORM**: Object Relational Mapper for Node.js.
- **Passport.js and jsonwebtoken**: For secure user authentication.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/devashishchakraborty/recipe-connect-backend.git
   cd recipe-connect-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=
   ACCESS_TOKEN_SECRET=
   ```

4. **Start the server**:

   ```bash
   node --watch .
   ```

   The API will be accessible at `http://localhost:3000`.

## API Endpoints

- **Authentication**:

  - `POST /sign-up`: Register a new user.
  - `POST /login`: Authenticate a user and retrieve a token.

- **Recipes**:

  - `GET /recipes`: Retrieve all published recipes.
  - `GET /recipes/:recipeId`: Retrieve a specific recipe by ID.
  - `GET /recipes/user`: Retrieve all recipes of a user.
  - `POST /recipes`: Create a new recipe.
  - `PUT /recipes/:recipeId`: Update a recipe by ID.
  - `DELETE /recipes/:recipeId`: Delete a recipe by ID.

- **Comments**:
  - `GET /recipes/:recipeId/comments`: Retrieve comments for a specific recipe.
  - `POST /recipes/:recipeId/comments`: Add a comment to a recipe.
  - `DELETE /comments/:commentId`: Delete a comment by ID.
